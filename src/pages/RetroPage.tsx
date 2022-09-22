import React from "react";

import PageHeader from "../components/common/PageHeader";
import RetroSession from "../components/retro/RetroSession";

const RetroPage: React.FC = () => (
  <>
    <PageHeader
      text="Retrospective"
      breadcrumbItems={[{ title: "Home", href: "/" }, { title: "Retrospective" }]}
    />
    <RetroSession />
  </>
);

export default RetroPage;
