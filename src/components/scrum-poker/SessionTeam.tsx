import { Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";

import { ScrumPokerSessionUser, ScrumPokerSessionUserTable } from "../../models/supabaseEntities";
import { supabase } from "../../utilities/supabase";

interface SessionTeamProps {
  sessionID: string;
  currentUserSession?: ScrumPokerSessionUser;
  showVotes: boolean;
}

const SessionTeam: React.FC<SessionTeamProps> = ({ sessionID, currentUserSession, showVotes }) => {
  const [sessionUserVotes, setSessionUserVotes] = useState<ScrumPokerSessionUser[]>([]);

  useEffect(() => {
    getSessionUserVotes();
  }, [currentUserSession]);

  useEffect(() => {
    const sessionUsersSub = supabase
      .channel(`public:${ScrumPokerSessionUserTable}:session_id=eq.${sessionID}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: ScrumPokerSessionUserTable },
        // @ts-ignore
        (payload) => {
          console.log("INSERT", payload);
          setSessionUserVotes((current) => {
            return [...current, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: ScrumPokerSessionUserTable },
        // @ts-ignore
        (payload) => {
          console.log("UPDATE", payload);
          setSessionUserVotes((current) => {
            let currentUser = current.find((w) => w.user_id === payload.new.user_id)!;
            currentUser.vote = payload.new.vote;
            currentUser.is_voted = payload.new.is_voted;

            return [...current.filter((w) => w.user_id !== payload.new.user_id), currentUser];
          });
        }
      );

    sessionUsersSub.subscribe();

    return () => {
      sessionUsersSub.unsubscribe();
    };
  }, []);

  const getSessionUserVotes = async () => {
    const { data, error } = await supabase
      .from(ScrumPokerSessionUserTable)
      .select("*")
      .eq("session_id", sessionID!);

    if (error) {
      showNotification({
        title: "Session User Error",
        message: error.message,
        color: "red",
      });

      return;
    }

    setSessionUserVotes(data as ScrumPokerSessionUser[]);
  };

  return (
    <>
      <Text color="cyan" size={20}>
        <b>Team</b>
        <hr color="gray" />
      </Text>
      {sessionUserVotes
        .sort((a, b) => (a.user_full_name < b.user_full_name ? -1 : 1))
        .map((member, idx) => (
          <Group key={idx} position="apart">
            <Text color={member.is_voted ? "green" : ""} weight={800}>
              {member?.user_full_name}
            </Text>
            <Text size={24} weight={800}>
              {showVotes ? member.vote : "?"}
            </Text>
          </Group>
        ))}
    </>
  );
};

export default SessionTeam;
