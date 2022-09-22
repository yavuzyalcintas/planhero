import { Button, Center, CopyButton, Grid, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEye, IconEyeOff, IconLink, IconRepeat } from "@tabler/icons";
import React, { useEffect, useState } from "react";

import {
  ProfilesTable,
  ScrumPokerSessionTable,
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
  const [scrumMaster, setScrumMaster] = useState<string | null>(null);

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

    const channel = supabase.channel(`scrum-poker-actions:${sessionID}`, {
      configs: {
        broadcast: { ack: true },
      },
    });

    // @ts-ignore
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.send({
          type: "broadcast",
          event: "reset",
          //payload: { x: Math.random(), y: Math.random() },
        });
        setSelectedVote("0");
        setShowVotes(false);
      }
    });
  };

  const toggleVoteVisibilty = async () => {
    const channel = supabase.channel(`scrum-poker-actions:${sessionID}`, {
      configs: {
        broadcast: { ack: true },
      },
    });

    // @ts-ignore
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.send({
          type: "broadcast",
          event: "toggle-vote-visibilty",
          //payload: { x: Math.random(), y: Math.random() },
        });
        setShowVotes(!showVotes);
      }
    });
  };

  const setScrumMasterData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from(ScrumPokerSessionTable)
      .select()
      .eq("id", sessionID)
      .single();

    if (error) {
      showNotification({
        title: "Scrum Master Error",
        message: error.message,
        color: "red",
      });
      return;
    }

    if (data) setScrumMaster(data.created_by);
  };

  const removeUserFromSession = async () => {
    const { error } = await supabase
      .from(ScrumPokerSessionUserTable)
      .delete()
      .eq("session_id", sessionID)
      .eq("user_id", user?.id);

    if (error) {
      showNotification({
        title: "Remove User Session Error",
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

  useEffect(() => {
    setScrumMasterData();
    const channel = supabase.channel(`scrum-poker-actions:${sessionID}`);

    // listen to broadcasts
    channel
      // @ts-ignore
      .on("broadcast", { event: "reset" }, () => {
        setSelectedVote("0");
        setShowVotes(false);
      }) // @ts-ignore
      .on("broadcast", { event: "toggle-vote-visibilty" }, () => {
        setShowVotes(!showVotes);
      }) // @ts-ignore
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // your callback function will now be called with the received messages
        }
      });

    return () => {
      channel.unsubscribe();
      removeUserFromSession();
    };
  }, []);

  return (
    <>
      <Grid mb={5}>
        <Grid.Col sx={{ textAlign: "right" }}>
          <CopyButton value={window.location.href}>
            {({ copied, copy }) => (
              <Button
                leftIcon={<IconLink size={30} />}
                color={copied ? "yellow" : "cyan"}
                onClick={copy}
                sx={{ marginRight: "25px" }}
              >
                {copied ? "Link Copied" : "Invite"}
              </Button>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>

      <Group position="center" grow>
        <ScrumPokerCards
          sessionID={sessionID}
          currentUserSession={currentUserSession}
          setSelectedVote={setSelectedVote}
          selectedVote={selectedVote}
        />
        <div style={{ minWidth: 250, maxWidth: 750 }}>
          {user?.id == scrumMaster && (
            <Center>
              <Button.Group>
                <Button
                  size="lg"
                  variant="outline"
                  color="cyan"
                  leftIcon={<IconRepeat size={14} />}
                  disabled={!showVotes}
                  onClick={() => resetGame()}
                >
                  Reset Game
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="green"
                  disabled={showVotes}
                  leftIcon={showVotes ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                  onClick={() => toggleVoteVisibilty()}
                >
                  {showVotes ? "Hide" : "Show"} Votes
                </Button>
              </Button.Group>
            </Center>
          )}

          <SessionTeam
            sessionID={sessionID}
            currentUserSession={currentUserSession}
            showVotes={showVotes}
            scrumMaster={scrumMaster!}
          />
        </div>
      </Group>
    </>
  );
};

export default ScrumPokerGame;
