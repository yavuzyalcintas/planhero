import { Grid } from "@mantine/core";
import React, { useEffect, useState } from "react";

import {
  RetroSessionMessages,
  RetroSessionMessagesTable,
  RetroSessionMessageTypes,
} from "../../models/supabaseEntities";
import { getRetroMessages } from "../../services/retroService";
import { supabase } from "../../utilities/supabase";
import RetroBoardCard from "./RetroBoardCard";

interface RetroSessionGameProps {
  sessionID: string;
}

const RetroSessionGame: React.FC<RetroSessionGameProps> = ({ sessionID }) => {
  const [retroMessages, setRetroMessages] = useState<RetroSessionMessages[]>([]);

  // beni obur dosyada biraktin korktum cok yalniz kaldim cok karanlik bir yerdeyim
  const setAllRetroMessages = async () => {
    const { data } = await getRetroMessages(sessionID);

    if (data) {
      setRetroMessages(data as RetroSessionMessages[]);
    }
  };

  useEffect(() => {
    setAllRetroMessages();
  }, []);

  useEffect(() => {
    const sessionUsersSub = supabase
      .channel(`public:${RetroSessionMessagesTable}:session_id=eq.${sessionID}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: RetroSessionMessagesTable,
          filter: `session_id=eq.${sessionID}`,
        },
        // @ts-ignore
        (payload) => {
          setRetroMessages((current) => {
            return [...current, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: RetroSessionMessagesTable,
          filter: `session_id=eq.${sessionID}`,
        },
        // @ts-ignore
        (payload) => {
          setRetroMessages((current) => {
            return [...current.filter((w) => w.id !== payload.new.id), payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: RetroSessionMessagesTable,
          filter: `session_id=eq.${sessionID}`,
        },
        // @ts-ignore
        async (payload) => {
          setRetroMessages((current) => current.filter((w) => w.id !== payload.old.id));
        }
      );

    sessionUsersSub.subscribe();

    return () => {
      sessionUsersSub.unsubscribe();
    };
  }, []);

  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <RetroBoardCard
            title="Start"
            type={RetroSessionMessageTypes.Start}
            messages={retroMessages.filter((w) => w.type === RetroSessionMessageTypes.Start)}
            sessionID={sessionID}
            color={"green"}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <RetroBoardCard
            title="Stop"
            type={RetroSessionMessageTypes.Stop}
            messages={retroMessages.filter((w) => w.type === RetroSessionMessageTypes.Stop)}
            sessionID={sessionID}
            color={"red"}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <RetroBoardCard
            title="Continue"
            type={RetroSessionMessageTypes.Continue}
            messages={retroMessages.filter((w) => w.type === RetroSessionMessageTypes.Continue)}
            sessionID={sessionID}
            color={"cyan"}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <RetroBoardCard
            title="Actions"
            type={RetroSessionMessageTypes.Actions}
            messages={retroMessages.filter((w) => w.type === RetroSessionMessageTypes.Actions)}
            sessionID={sessionID}
            color={"yellow"}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default RetroSessionGame;
