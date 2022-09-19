import React from "react";

import PageHeader from "../components/common/PageHeader";
import { HeroTitle } from "../components/HeroTitle";
import { useSession } from "../hooks/useSession";

const HomePage: React.FC = () => {
  const user = useSession();

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
};

export default HomePage;
