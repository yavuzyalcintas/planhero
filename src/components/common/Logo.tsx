import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface LogoProps {
  fontSize?: number;
}

const Logo: React.FC<LogoProps> = ({ fontSize = 18 }) => {
  return (
    <Link to="/" style={{ textDecoration: "none", fontSize: fontSize }}>
      <Text color="yellow" weight={700} align="center">
        PlanHero
      </Text>
    </Link>
  );
};

export default Logo;
