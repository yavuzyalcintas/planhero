import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Text color="yellow" weight={700} align="center">
        PlanHero
      </Text>
    </Link>
  );
};

export default Logo;
