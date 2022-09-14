import { Group, Text } from "@mantine/core";
import React from "react";

import { ScrumPokerSessionUser } from "../models/supabaseEntities";

interface TeamProps {
  sessionUserVotes: ScrumPokerSessionUser[];
}

const Team: React.FC<TeamProps> = ({ sessionUserVotes }) => {
  const teamMembers = sessionUserVotes.map((userVote) => {
    return { name: userVote.user_id, vote: userVote.vote };
  });

  return (
    <>
      <Text color="cyan" size={20}>
        <b>Team</b>
        <hr color="gray" />
      </Text>
      {teamMembers.map((member, idx) => (
        <Group key={idx} position="apart">
          <Text>{member.name}</Text>
          <Text size={24} weight={800}>
            {member.vote}
          </Text>
        </Group>
      ))}
    </>
  );
};

export default Team;
