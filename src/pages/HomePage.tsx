import { Text } from "@mantine/core";
import { HeroTitle } from "../components/HeroTitle";
import { useAuth } from "../utilities/authProvider";

export function HomePage() {
  const user = useAuth();

  return (
    <>
      {user && (
        <Text align="right">
          Hi,{" "}
          <Text color="yellow">
            <b>{user.email?.split("@")[0]}</b>
          </Text>
        </Text>
      )}

      <HeroTitle />
    </>
  );
}
