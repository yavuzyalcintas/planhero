import { Text } from "@mantine/core";
import PageHeader from "../components/common/PageHeader";
import { HeroTitle } from "../components/HeroTitle";
import { useAuth } from "../utilities/authProvider";

export function HomePage() {
  const user = useAuth();

  return (
    <>
      {user ? (
        <>
          <PageHeader text="Recent Activities" />
        </>
      ) : (
        <HeroTitle />
      )}
    </>
  );
}
