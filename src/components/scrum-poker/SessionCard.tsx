import React from "react";
import { NavLink } from "@mantine/core";
import { IconChevronRight, IconHome } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

interface SessionCardProps {
  title: string;
  description: string;
  sessionID: string;
}

const SessionCard: React.FC<SessionCardProps> = ({ title, description, sessionID }) => {
  const navigate = useNavigate();
  return (
    <NavLink
      label={title}
      description={description}
      icon={<IconHome color="orange" size={28} />}
      rightSection={<IconChevronRight color="orange" size={28} stroke={1.5} />}
      onClick={() => navigate(sessionID)}
    />
  );
};

export default SessionCard;
