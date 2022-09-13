import React from "react";
import { Text, Space, Group, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";

type Session = {
  id: string;
  name: string;
  created_at: Date;
  created_by: string;
};

const ScrumPoker: React.FC = () => {
  const [sessions, setSesions] = useState<Session[]>();
  const form = useForm({
    initialValues: {
      sessionName: "",
    },
  });

  const user = useAuth();

  const handleSubmit = async (values: typeof form.values) => {
    console.log("sessionName", values.sessionName);

    const { data, error } = await supabase
      .from<Session>("scrum_poker_session")
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
      .from<Session>("scrum_poker_session")
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

      {sessions?.map((session) => (
        <h1 key={session.id}>{session.name}</h1>
      ))}
    </>
  );
};

export default ScrumPoker;
