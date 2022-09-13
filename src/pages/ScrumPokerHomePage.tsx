import React from "react";
import PageHeader from "../components/common/PageHeader";
import ScrumPoker from "../components/scrum-poker/ScrumPoker";

const ScrumPokerHomePage: React.FC = () => (
  <>
    <PageHeader
      text="Scrum Poker"
      breadcrumbItems={[{ href: "/", title: "Home" }, { title: "Scrum Poker" }]}
    />

    <ScrumPoker />
  </>
);

export default ScrumPokerHomePage;
