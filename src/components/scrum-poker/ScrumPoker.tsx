import { Button, Group, Space, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { useEffect, useState } from "react";

import { ScrumPokerSession, ScrumPokerSessionTable } from "../../models/supabaseEntities";
import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";
import SessionCard from "./SessionCard";

const ScrumPoker: React.FC = () => {
  const [sessions, setSesions] = useState<ScrumPokerSession[]>();
  const user = useAuth();
  const form = useForm({
    initialValues: {
      sessionName: "",
    },
  });

  // Create new session
  const handleSubmit = async (values: typeof form.values) => {
    const { data, error } = await supabase
      .from<ScrumPokerSession>("scrum_poker_session")
      .insert([{ name: values.sessionName, created_by: user?.id }])
      .single();

    if (error) {
      showNotification({
        title: "Session Error",
        message: error.message,
        color: "red",
      });

      return;
    }

    setSesions([
      ...(sessions || []),
      {
        id: data.id,
        name: data.name,
        created_at: data.created_at,
        created_by: data.created_by,
      },
    ]);
  };

  const getSessions = async () => {
    const { data, error } = await supabase
      .from<ScrumPokerSession>(ScrumPokerSessionTable)
      .select()
      .eq("created_by", user?.id!)
      .limit(5)
      .order("created_at", { ascending: false });

    if (error) {
      showNotification({
        title: "Session Error",
        message: error.message,
        color: "red",
      });

      return;
    }

    setSesions(data);
  };

  useEffect(() => {
    if (user) getSessions();
  }, [user]);

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

export default ScrumPoker;
