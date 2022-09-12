import PageHeader from "../components/common/PageHeader";
import ScrumPoker from "../components/scrum-poker/ScrumPoker";

const ScrumPokerPage: React.FC = () => {
  return (
    <>
      <PageHeader text="Scrum Poker" />
      <ScrumPoker />
    </>
  );
};

export default ScrumPokerPage;
