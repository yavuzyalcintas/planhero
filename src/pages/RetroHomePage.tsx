import React from "react";

import PageHeader from "../components/common/PageHeader";
import RetroSessionHome from "../components/retro/RetroSessionHome";

const RetroHomePage: React.FC = () => (
  <>
    <PageHeader
      text="Retrospective"
      breadcrumbItems={[{ title: "Home", href: "/" }, { title: "Retrospective" }]}
    />
    <RetroSessionHome />
  </>
);

export default RetroHomePage;
