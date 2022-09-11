import { Text } from "@mantine/core";
import { useAuth } from "../utilities/authProvider";

export function HomePage() {
  const user = useAuth();

  return (
    <>
      <h1>Public Home Page</h1>

      {user && (
        <h3>
          Welcome back, <Text color="yellow">{user.email}</Text>
        </h3>
      )}
    </>
  );
}
