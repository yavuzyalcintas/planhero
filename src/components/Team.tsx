import { Group, Text } from "@mantine/core";
import React from "react";

const Team: React.FC = () => {
  const teamMembers = [
    { name: "AtarliBoi", vote: 5 },
    { name: "HaveUMetEge", vote: 3 },
    { name: "muratcansahn", vote: 21 },
    { name: "seNeTV", vote: 34 },
    { name: "mgmetehanxx", vote: 8 },
  ];

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
