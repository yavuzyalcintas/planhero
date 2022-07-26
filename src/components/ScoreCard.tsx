import { Card } from "react-bootstrap";

interface ScoreCardProps {
  id: number;
  cardValue: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ cardValue }) => {
  return (
    <Card className="pb-5 pt-5">
      <Card.Body className="text-center">
        <h1 className="text-primary" style={{ fontSize: 95 }}>
          {cardValue}
        </h1>
      </Card.Body>
    </Card>
  );
};

export default ScoreCard;
