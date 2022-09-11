import { Card, Center, Grid, Text } from "@mantine/core";

const ScrumPoker: React.FC = () => {
  return (
    <>
      <Grid>
        {[1, 2, 3, 5, 8, 13, 21, 34].map((score, index) => {
          return (
            <Grid.Col span={3} key={index}>
              <Card radius="md" withBorder>
                <Center>
                  <Text size={100}>{score}</Text>
                </Center>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default ScrumPoker;
