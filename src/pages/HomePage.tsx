import React from "react";

import { HeaderMenu } from "../components/common/HeaderMenu";
import PageHeader from "../components/common/PageHeader";
import { HeroTitle } from "../components/HeroTitle";
import RecentActivitiesSummary from "../components/RecentActivitiesSummary";
import { useAuth } from "../utilities/authProvider";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <>
          <PageHeader text="Recent Activities" />
          <RecentActivitiesSummary />
        </>
      ) : (
        <>
          <HeaderMenu />
          <HeroTitle />
        </>
      )}
    </>
  );
};

export default HomePage;
