import { Button, Group, Space, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { RetroSession } from "../../models/supabaseEntities";
import { createRetroSession, getRetroSessions } from "../../services/retroService";
import { useAuth } from "../../utilities/authProvider";
import SessionCard from "../SessionCard";

const RetroSessionHome = () => {
  const [sessions, setSesions] = useState<RetroSession[]>();
  const { user } = useAuth();
  const form = useForm({
    initialValues: {
      sessionName: "",
    },
  });

  // Create new session
  const handleSubmit = async (values: typeof form.values) => {
    const { data, error } = await createRetroSession(values.sessionName, user?.id!);

    if (error) return;

    form.setFieldValue("sessionName", "");

    setSesions([...(sessions || []), data as RetroSession]);
  };

  const getSessions = async () => {
    const { data, error } = await getRetroSessions(user?.id!);

    if (error) return;

    setSesions(data as RetroSession[]);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <>
      <Text size={16} color="yellow" weight={600}>
        Create New Room
      </Text>
      <Space h="xs" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group>
          <TextInput
            size="lg"
            placeholder="Room Name"
            value={form.values.sessionName}
            onChange={(event) => {
              form.setFieldValue("sessionName", event.currentTarget.value);
            }}
          />
          <Button size="lg" type="submit">
            Create
          </Button>
        </Group>
      </form>

      <Stack mt={20}>
        {sessions?.map((session) => (
          <SessionCard
            key={session.id}
            title={session.name}
            description={`Session ID: ${session.id}`}
            sessionID={session.id}
          />
        ))}
      </Stack>
    </>
  );
};

export default RetroSessionHome;
