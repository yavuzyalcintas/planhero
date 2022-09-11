import ScrumPoker from "../components/ScrumPoker";

import PageHeader from "../components/common/PageHeader";

const ScrumPokerPage: React.FC = () => {
  return (
    <>
      <PageHeader text="Scrum Poker" />
      <ScrumPoker />
    </>
  );
};

export default ScrumPokerPage;
