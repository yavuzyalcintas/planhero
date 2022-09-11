import { Grid } from "@mantine/core";
import ScoreCard from "./ScoreCard";

const ScrumPoker: React.FC = () => {
  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <div>
            {[1, 2, 3].map((score) => {
              return <ScoreCard cardValue={score} key={score} id={score} />;
            })}
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <h4>
            <b>Team</b>
          </h4>
          <hr />

          <div>
            <div>
              <h5>Yavuz Y.</h5>
            </div>
            <div>
              <h5>Ahmet T.</h5>
            </div>
            <div>
              <h5>Mehmet R.</h5>
            </div>
            <div>
              <h5>Ayşe C.</h5>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ScrumPoker;
