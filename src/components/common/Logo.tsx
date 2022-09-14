import React from "react";
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

type LogoProps = {
  fontSize?: number;
};

const Logo: React.FC<LogoProps> = ({ fontSize = 18 }) => (
  <Link to="/" style={{ textDecoration: "none", fontSize }}>
    <Text color="yellow" weight={700} align="center">
      PlanHero
    </Text>
  </Link>
);

export default Logo;
