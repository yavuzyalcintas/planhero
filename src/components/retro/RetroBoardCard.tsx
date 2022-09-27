import { ActionIcon, Card, Group, MantineColor, Text, Textarea } from "@mantine/core";
import { IconArrowRight, IconThumbUp } from "@tabler/icons";
import React, { useState } from "react";

import { RetroSessionMessages } from "../../models/supabaseEntities";
import { createRetroMessage } from "../../services/retroService";
import { useAuth } from "../../utilities/authProvider";

interface RetroBoardCardProps {
  type: string;
  title: string;
  sessionID: string;
  color: MantineColor;
  messages: RetroSessionMessages[] | [];
}

const RetroBoardCard: React.FC<RetroBoardCardProps> = ({
  title,
  sessionID,
  type,
  messages,
  color,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createMessage = async () => {
    if (!message) return;
    setIsLoading(true);

    const { data } = await createRetroMessage(message!, sessionID, type, user!.id);

    if (data?.id) {
      setMessage("");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Text weight={800} color={color} size="xl">
        {title}
      </Text>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Textarea
          placeholder="Enter your message"
          autosize
          maxRows={3}
          radius="xl"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color="yellow"
              variant="filled"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => {
                createMessage();
              }}
            >
              <IconArrowRight size={18} stroke={1.5} />
            </ActionIcon>
          }
        />

        {messages &&
          messages.map((message) => {
            return (
              <Group mt="md" pb="xs" position="apart" noWrap key={message.id}>
                <Text size="sm" color="dimmed" p={10} sx={{ borderRadius: 5 }}>
                  {message.message}
                </Text>
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  color="cyan"
                  size="lg"
                  sx={{ alignSelf: "flex-end" }}
                >
                  <Text weight={500}>{message.like_count! > 0 && message.like_count}</Text>
                  <IconThumbUp size={16} />
                </ActionIcon>
              </Group>
            );
          })}
      </Card>
    </>
  );
};

export default RetroBoardCard;
