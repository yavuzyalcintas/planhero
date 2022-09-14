import React from "react";

import PageHeader from "../components/common/PageHeader";
import { HeroTitle } from "../components/HeroTitle";
import { useAuth } from "../utilities/authProvider";

const HomePage: React.FC = () => {
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
};

export default HomePage;
