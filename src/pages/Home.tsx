import ScoreCard from "../components/ScoreCard";
import { Row, Col } from "react-bootstrap";

export function Home() {
  return (
    <>
      <Row md={4} xs={2} lg={4} className="g-3">
        {[1, 2, 3, 5, 8, 13, 21].map((cardValue) => (
          <Col key={cardValue}>
            <ScoreCard id={cardValue} cardValue={cardValue}></ScoreCard>
          </Col>
        ))}
      </Row>
    </>
  );
}
