import { Grid } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { RetroSessionMessages, RetroSessionMessageTypes } from "../../models/supabaseEntities";
import { getRetroMessages } from "../../services/retroService";
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
