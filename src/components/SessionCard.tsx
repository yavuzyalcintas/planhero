import { createStyles, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconColorSwatch } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

interface SessionCardProps {
  title: string;
  description: string;
  sessionID: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(0, theme.colors.cyan[6], theme.colors.orange[6]),
    },
  },
}));

const SessionCard: React.FC<SessionCardProps> = ({ title, description, sessionID }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <Paper
      key={sessionID}
      withBorder
      radius="md"
      sx={{ width: 400 }}
      className={classes.card}
      onClick={() => navigate(sessionID)}
    >
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: "cyan", to: "orange" }}
      >
        <IconColorSwatch size={28} stroke={1.5} />
      </ThemeIcon>
      <Text size="xl" weight={500} mt="md">
        {title}
      </Text>
      <Text size="xs" mt="sm" color="dimmed">
        {description}
      </Text>
    </Paper>
  );
};

export default SessionCard;
