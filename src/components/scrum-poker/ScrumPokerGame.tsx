import { Button, Center, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconPlayerStop, IconRepeat } from "@tabler/icons";
import React, { useEffect, useState } from "react";

import { useSession } from "../../hooks/useSession";
import {
  ProfilesTable,
  ScrumPokerSessionUser,
  ScrumPokerSessionUserTable,
} from "../../models/supabaseEntities";
import { supabase } from "../../utilities/supabase";
import ScrumPokerCards from "./ScrumPokerCards";
import SessionTeam from "./SessionTeam";

type ScrumPokerGameProps = {
  sessionID: string;
};

const ScrumPokerGame: React.FC<ScrumPokerGameProps> = ({ sessionID }) => {
  const user = useSession();
  const [currentUserSession, setCurrentUserSession] = useState<ScrumPokerSessionUser | undefined>(
    undefined
  );
  const [showVotes, setShowVotes] = useState<boolean>(false);

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
  };

  useEffect(() => {
    if (user) {
      createSessionUser();
    }
  }, [user]);

  return (
    <Group position="center" grow>
      <ScrumPokerCards sessionID={sessionID} currentUserSession={currentUserSession} />
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
