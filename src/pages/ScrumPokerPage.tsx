import ScrumPoker from "../components/ScrumPoker";
import { IconDeviceGamepad } from "@tabler/icons";

const ScrumPokerPage: React.FC = () => {
  return (
    <>
      <h1>
        <IconDeviceGamepad color="yellow" /> Scrum Poker
      </h1>
      <ScrumPoker />
    </>
  );
};

export default ScrumPokerPage;
