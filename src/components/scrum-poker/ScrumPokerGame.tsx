import React, { useEffect } from "react";
import { Card, Center, Container, Grid, Stack, Text } from "@mantine/core";
import Team from "../Team";
import { showNotification } from "@mantine/notifications";
import { supabase } from "../../utilities/supabase";
import {
  ScrumPokerSessionUser,
  ScrumPokerSessionUserTable,
} from "../../models/supabaseEntities";
import { useAuth } from "../../utilities/authProvider";

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
    <Stack>
      <Grid>
        {[1, 2, 3, 5, 8, 13, 21, 34].map((score, index) => (
          <Grid.Col span={3} key={index}>
            <Card radius="md" withBorder>
              <Center>
                <Text size={100}>{score}</Text>
              </Center>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <Container style={{ minWidth: 400 }}>
        <Team />
      </Container>
    </Stack>
  );
};

export default ScrumPokerGame;
