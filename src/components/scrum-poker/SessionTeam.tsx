import { Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";

import { ScrumPokerSessionUser, ScrumPokerSessionUserTable } from "../../models/supabaseEntities";
import { supabase } from "../../utilities/supabase";

interface SessionTeamProps {
  sessionID: string;
  currentUserSession?: ScrumPokerSessionUser;
}

const SessionTeam: React.FC<SessionTeamProps> = ({ sessionID, currentUserSession }) => {
  const [sessionUserVotes, setSessionUserVotes] = useState<ScrumPokerSessionUser[]>([]);

  useEffect(() => {
    getSessionUserVotes();
  }, [currentUserSession]);

  useEffect(() => {
    const mySubscription = supabase
      .from<ScrumPokerSessionUser>(`${ScrumPokerSessionUserTable}:session_id=eq.${sessionID}`)
      .on("INSERT", (payload) => {
        setSessionUserVotes((current) => {
          return [...current, payload.new];
        });
      })
      .on("UPDATE", (payload) => {
        setSessionUserVotes((current) => {
          let currentUser = current.find((w) => w.user_id === payload.new.user_id)!;
          currentUser.vote = payload.new.vote;

          return [...current.filter((w) => w.user_id !== payload.new.user_id), currentUser];
        });
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  const getSessionUserVotes = async () => {
    const { data, error } = await supabase
      .from<ScrumPokerSessionUser>(ScrumPokerSessionUserTable)
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

    setSessionUserVotes(data);
  };

  return (
    <>
      <Text color="cyan" size={20}>
        <b>Team</b>
        <hr color="gray" />
      </Text>
      {sessionUserVotes.sort().map((member, idx) => (
        <Group key={idx} position="apart">
          <Text>{member?.user_full_name}</Text>
          <Text size={24} weight={800}>
            {member.vote}
          </Text>
        </Group>
      ))}
    </>
  );
};

export default SessionTeam;
