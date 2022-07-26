import ScoreCard from "../components/ScoreCard";
import { Row, Col } from "react-bootstrap";

export function Home() {
  return (
    <>
      <Row>
        <Col xs={8} md={8} lg={8}>
          <Row md={2} xs={2} lg={3} className="g-3">
            {[1, 2, 3, 5, 8, 13, 21].map((cardValue) => (
              <Col key={cardValue}>
                <ScoreCard id={cardValue} cardValue={cardValue}></ScoreCard>
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <h4 className="text-primary">
            <b>Team</b>
          </h4>
          <hr />

          <div className="bg-white shadow-sm p-3">
            <div className="border-bottom mb-2 text-success">
              <h5>Yavuz Y.</h5>
            </div>
            <div className="border-bottom mb-2">
              <h5>Ahmet T.</h5>
            </div>
            <div className="border-bottom mb-2">
              <h5>Mehmet R.</h5>
            </div>
            <div className="border-bottom mb-2">
              <h5>Ayşe C.</h5>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
