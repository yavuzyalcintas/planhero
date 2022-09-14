import React from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import ScrumPokerGame from "../components/scrum-poker/ScrumPokerGame";

const ScrumPokerPage: React.FC = () => {
  const { sessionID } = useParams();

  return (
    <>
      <PageHeader
        text="Scrum Poker"
        breadcrumbItems={[
          { href: "/", title: "Home" },
          { href: "/scrum-poker", title: "Scrum Poker" },
          { title: "Game" },
        ]}
      />
      <ScrumPokerGame sessionID={sessionID!} />
    </>
  );
};

export default ScrumPokerPage;
