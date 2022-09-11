interface ScoreCardProps {
  id: number;
  cardValue: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ cardValue }) => {
  return <h1 style={{ fontSize: 95 }}>{cardValue}</h1>;
};

export default ScoreCard;
