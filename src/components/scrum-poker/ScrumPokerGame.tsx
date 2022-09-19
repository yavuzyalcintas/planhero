import { Button, Center, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconPlayerStop, IconRepeat } from "@tabler/icons";
import React, { useEffect, useState } from "react";

import {
  ProfilesTable,
  ScrumPokerSessionUser,
  ScrumPokerSessionUserTable,
} from "../../models/supabaseEntities";
import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";
import ScrumPokerCards from "./ScrumPokerCards";
import SessionTeam from "./SessionTeam";

type ScrumPokerGameProps = {
  sessionID: string;
};

const ScrumPokerGame: React.FC<ScrumPokerGameProps> = ({ sessionID }) => {
  const { user } = useAuth();
  const [currentUserSession, setCurrentUserSession] = useState<ScrumPokerSessionUser | undefined>(
    undefined
  );
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [selectedVote, setSelectedVote] = useState<string>("0");

  const createSessionUser = async () => {
    const profile = await supabase.from(ProfilesTable).select("*").eq("id", user?.id!).single();

    const { data, error } = await supabase
      .from(ScrumPokerSessionUserTable)
      .upsert({
        user_id: user?.id!,
        session_id: sessionID!,
        user_full_name: profile.data?.full_name!,
      })
      .select()
      .single();

    if (error) {
      showNotification({
        title: "Session User Error",
        message: error.message,
        color: "red",
      });
      return;
    }

    setCurrentUserSession(data as ScrumPokerSessionUser);
  };

  const resetGame = async () => {
    const { error } = await supabase
      .from(ScrumPokerSessionUserTable)
      .update({
        is_voted: false,
        vote: "0",
      })
      .eq("session_id", sessionID!);

    if (error) {
      showNotification({
        title: "Reset Error",
        message: error.message,
        color: "red",
      });
      return;
    }

    const channel = supabase.channel("scrum-poker-actions", {
      configs: {
        broadcast: { ack: true },
      },
    });

    // @ts-ignore
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        // now you can start broadcasting messages
        // sending a new message every second

        const status = await channel.send({
          type: "broadcast",
          event: "reset",
          payload: { x: Math.random(), y: Math.random() },
        });
        console.log("Send Event: ", status);
        setSelectedVote("0");
      }
    });
  };

  useEffect(() => {
    if (user) {
      createSessionUser();
    }
  }, [user]);

  useEffect(() => {
    // use the same channel name as the client broadcasting the message is using
    const channel = supabase.channel("scrum-poker-actions");

    // listen to broadcasts
    channel
      // @ts-ignore
      .on("broadcast", { event: "location" }, (payload) => {
        console.log("reset", payload);
        setSelectedVote("0");
      }) // @ts-ignore
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          console.log("Listen Event: ", status);
          // your callback function will now be called with the received messages
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <Group position="center" grow>
      <ScrumPokerCards
        sessionID={sessionID}
        currentUserSession={currentUserSession}
        setSelectedVote={setSelectedVote}
        selectedVote={selectedVote}
      />
      <div style={{ minWidth: 250, maxWidth: 750 }}>
        <Center>
          <Button.Group>
            <Button
              size="lg"
              variant="outline"
              color="cyan"
              leftIcon={<IconRepeat size={14} />}
              onClick={() => resetGame()}
            >
              Reset Game
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="green"
              leftIcon={<IconCheck size={14} />}
              onClick={() => setShowVotes(!showVotes)}
            >
              {showVotes ? "Hide" : "Show"} Votes
            </Button>
            <Button size="lg" variant="outline" color="red" leftIcon={<IconPlayerStop size={14} />}>
              Finish Game
            </Button>
          </Button.Group>
        </Center>

        <SessionTeam
          sessionID={sessionID}
          currentUserSession={currentUserSession}
          showVotes={showVotes}
        />
      </div>
    </Group>
  );
};

export default ScrumPokerGame;
