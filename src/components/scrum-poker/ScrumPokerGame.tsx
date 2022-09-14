import { Card, Center, Grid, Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect } from "react";

import { ScrumPokerSessionUser, ScrumPokerSessionUserTable } from "../../models/supabaseEntities";
import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";
import Team from "../Team";

type ScrumPokerGameProps = {
  sessionID: string;
};

const ScrumPokerGame: React.FC<ScrumPokerGameProps> = ({ sessionID }) => {
  const user = useAuth();

  const createSessionUser = async () => {
    const { error } = await supabase
      .from<ScrumPokerSessionUser>(ScrumPokerSessionUserTable)
      .upsert({ user_id: user?.id, session_id: sessionID! });

    if (error) {
      showNotification({
        title: "Session User Error",
        message: error.message,
        color: "red",
      });

      return;
    }
  };

  useEffect(() => {
    createSessionUser();
  }, []);

  return (
    <Group position="center" grow>
      <Grid>
        {[1, 2, 3, 5, 8, 13, 21, 34].map((score, index) => (
          <Grid.Col span={3} key={index} style={{ maxWidth: 500, minWidth: 250 }}>
            <Card radius="md" withBorder>
              <Center>
                <Text size={100}>{score}</Text>
              </Center>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <div style={{ minWidth: 400, maxWidth: 600 }}>
        <Team />
      </div>
    </Group>
  );
};

export default ScrumPokerGame;
