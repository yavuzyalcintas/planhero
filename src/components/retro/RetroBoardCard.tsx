import { ActionIcon, Card, MantineColor, Text, Textarea } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React, { useState } from "react";

import { RetroSessionMessages } from "../../models/supabaseEntities";
import { createRetroMessage } from "../../services/retroService";
import { useAuth } from "../../utilities/authProvider";
import RetroBoardMessage from "./RetroBoardMessage";

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
          pb={"lg"}
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

        {(messages || []).map((message) => {
          return <RetroBoardMessage message={message} key={message.id} />;
        })}
      </Card>
    </>
  );
};

export default RetroBoardCard;
