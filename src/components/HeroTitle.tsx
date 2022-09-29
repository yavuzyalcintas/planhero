import {
  Button,
  Container,
  createStyles,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import { IconCheck } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

import image from "../assets/hero-banner.png";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 430,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function HeroTitle() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>simple</span> planning tool for
              <br />
              <Text variant="gradient" gradient={{ from: "yellow", to: "cyan" }}>
                Agile Teams
              </Text>
            </Title>
            <Text color="dimmed" mt="md">
              You can play <b>Scrum Poker</b> and do <b>Retrospective</b> with your teams. It&apos;s{" "}
              <b>free</b> and <b>Open-Source</b>!
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Scrum Poker</b> – size your tasks with your team!
              </List.Item>
              <List.Item>
                <b>Retrospective</b> – do it better, do it together
              </List.Item>
              <List.Item>
                <b>Realtime</b>
              </List.Item>
            </List>

            <Group pt={20}>
              <Button
                size="lg"
                className={classes.control}
                color="yellow"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Get started
              </Button>

              <Button
                component="a"
                href="https://github.com/yavuzyalcintas/planhero"
                size="lg"
                variant="default"
                target="_blank"
                className={classes.control}
                leftIcon={<GithubIcon size={20} />}
              >
                GitHub
              </Button>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
