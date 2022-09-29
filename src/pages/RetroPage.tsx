import { useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import RetroSessionGame from "../components/retro/RetroSessionGame";

const RetroPage = () => {
  const { sessionID } = useParams();
  return (
    <>
      <PageHeader
        text="Retrospective"
        breadcrumbItems={[
          { title: "Home", href: "/" },
          { title: "Retrospective", href: "/retro" },
          { title: "Game" },
        ]}
      />

      <RetroSessionGame sessionID={sessionID!} />
    </>
  );
};

export default RetroPage;
