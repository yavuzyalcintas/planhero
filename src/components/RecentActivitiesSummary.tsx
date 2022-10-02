import { createStyles, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconColorSwatch, IconDeviceGamepad, IconMessages } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecentActivities } from "../models/supabaseEntities";
import { getRecentActivities } from "../services/summaryService";
import { useAuth } from "../utilities/authProvider";

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
      backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
    },
  },
}));

const RecentActivitiesSummary: React.FC = () => {
  const [recentActivities, setRecentActivities] = useState<RecentActivities[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyles();

  const getActivities = async () => {
    const { data } = await getRecentActivities(user!.id);

    if (data) {
      setRecentActivities(data as RecentActivities[]);
    }
  };

  function groupBy<T>(collection: T[], key: keyof T) {
    const groupedResult = collection.reduce((previous, current) => {
      if (!previous[current[key]]) {
        previous[current[key]] = [] as T[];
      }

      previous[current[key]].push(current);
      return previous;
    }, {} as any);
    return groupedResult;
  }

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      {Object.keys(groupBy<RecentActivities>(recentActivities, "type")).map((activityType) => (
        <div key={activityType}>
          <h2>{activityType}</h2>
          <Group>
            {recentActivities
              .filter((w) => w.type === activityType)
              .map((item) => (
                <Paper
                  key={item.session_id}
                  withBorder
                  radius="md"
                  sx={{ width: 400 }}
                  className={classes.card}
                  onClick={() => navigate(item.base_path + "/" + item.session_id)}
                >
                  <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="gradient"
                    gradient={{ deg: 0, from: "pink", to: "orange" }}
                  >
                    {item.type === "Scrum Poker" ? (
                      <IconDeviceGamepad size={28} stroke={1.5} />
                    ) : item.type === "Retrospective" ? (
                      <IconMessages size={28} stroke={1.5} />
                    ) : (
                      <IconColorSwatch size={28} stroke={1.5} />
                    )}
                  </ThemeIcon>
                  <Text size="xl" weight={500} mt="md">
                    {item.session_name}
                  </Text>
                  <Text size="sm" mt="sm" color="dimmed">
                    Created by <b>{item.created_by}</b>
                  </Text>
                </Paper>
              ))}
          </Group>
        </div>
      ))}
    </>
  );
};

export default RecentActivitiesSummary;
