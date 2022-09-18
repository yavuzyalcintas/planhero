import { Card, Center, createStyles, Grid, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";

import { ScrumPokerSessionUser, ScrumPokerSessionUserTable } from "../../models/supabaseEntities";
import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";

const useStyles = createStyles((theme) => ({
  link: {
    cursor: "pointer",
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

interface ScrumPokerCardsProps {
  sessionID: string;
  currentUserSession?: ScrumPokerSessionUser;
}

const ScrumPokerCards: React.FC<ScrumPokerCardsProps> = ({ sessionID, currentUserSession }) => {
  const { classes, cx } = useStyles();
  const user = useAuth();
  const [selectedVote, setSelectedVote] = useState<string>("0");

  const setVote = async (vote: string) => {
    const { error } = await supabase
      .from<ScrumPokerSessionUser>(ScrumPokerSessionUserTable)
      .update({
        is_voted: true,
        vote: vote,
      })
      .eq("session_id", sessionID)
      .eq("user_id", user?.id!)
      .single();

    if (error) {
      showNotification({
        title: "Session User Error",
        message: error.message,
        color: "red",
      });
      return;
    }

    setSelectedVote(vote);
  };

  useEffect(() => {
    setSelectedVote(currentUserSession?.vote!);
  }, [currentUserSession]);

  return (
    <Grid style={{ minWidth: 750 }}>
      {["1", "2", "3", "5", "8", "13", "21", "34", "55"].map((vote, index) => (
        <Grid.Col span={3} key={index} style={{ maxWidth: 500, minWidth: 250 }}>
          <Card
            radius="md"
            withBorder
            className={cx(classes.link, { [classes.active]: selectedVote === vote })}
            onClick={() => setVote(vote)}
          >
            <Center>
              <Text size={100}>{vote}</Text>
            </Center>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ScrumPokerCards;
