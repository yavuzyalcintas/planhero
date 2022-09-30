import { ActionIcon, Group, Menu, Text, Textarea } from "@mantine/core";
import { IconArrowForward, IconCheck, IconDotsVertical, IconEdit, IconTrashX } from "@tabler/icons";
import React, { useState } from "react";

import { RetroSessionMessages, RetroSessionMessageTypes } from "../../models/supabaseEntities";
import {
  deleteRetroMessage,
  setRetroMessageType,
  updateRetroMessage,
} from "../../services/retroService";
import { useAuth } from "../../utilities/authProvider";

interface RetroBoardMessageProps {
  message: RetroSessionMessages;
}

const RetroBoardMessage: React.FC<RetroBoardMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>(message.message);
  const [isLoading, setIsLoading] = useState(false);

  const editMessage = async () => {
    if (!message) return;
    setIsLoading(true);

    const { data } = await updateRetroMessage(message.id, messageText, user!.id);

    if (data?.id) {
      setEditEnabled(false);
    }

    setIsLoading(false);
  };

  return (
    <Group position="apart" noWrap pb={"sm"}>
      {editEnabled ? (
        <Textarea
          autosize
          sx={{ width: "100%" }}
          color="white"
          maxRows={3}
          value={messageText}
          onChange={(event) => setMessageText(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color="green"
              variant="filled"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => {
                editMessage();
              }}
            >
              <IconCheck size={18} stroke={1.5} />
            </ActionIcon>
          }
        />
      ) : (
        <Text
          size="sm"
          color="white"
          p={15}
          sx={{ width: "100%", borderRadius: 5, backgroundColor: "#1A1B1E" }}
        >
          {message.message}
        </Text>
      )}

      <div>
        <ActionIcon variant="subtle" radius="xl" color="gray" sx={{ alignSelf: "flex-end" }}>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDotsVertical size={16} />
            </Menu.Target>

            <Menu.Dropdown
              style={{
                marginBottom: "100px",
                marginRight: "130px",
                position: "fixed",
              }}
            >
              <Menu.Item
                color={"cyan"}
                icon={<IconEdit size={14} />}
                disabled={message.user_id !== user!.id}
                onClick={() => setEditEnabled(!editEnabled)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                color={"red"}
                icon={<IconTrashX size={14} />}
                disabled={message.user_id !== user!.id}
                onClick={async () => await deleteRetroMessage(message.id, user!.id)}
              >
                Delete
              </Menu.Item>
              {message.type !== RetroSessionMessageTypes.Actions && (
                <Menu.Item
                  color={"yellow"}
                  icon={<IconArrowForward size={14} />}
                  onClick={async () =>
                    await setRetroMessageType(message.id, RetroSessionMessageTypes.Actions)
                  }
                >
                  Action
                </Menu.Item>
              )}

              {/* <Menu.Item icon={<IconX size={14} />} onClick={() => setEditEnabled(false)}>
                Cancel
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </ActionIcon>

        {/* <ActionIcon
          variant="subtle"
          radius="xl"
          size={"lg"}
          color="cyan"
          sx={{ alignSelf: "flex-end" }}
        >
          <Text weight={500}>{message.like_count! > 0 && message.like_count}</Text>
          <IconThumbUp size={16} />
        </ActionIcon> */}
      </div>
    </Group>
  );
};

export default RetroBoardMessage;
