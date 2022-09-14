import React from "react";
import { createStyles, Container, Group, Anchor, Button } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import Logo from "./Logo";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

type FooterSimpleProps = {
  links: Array<{ link: string; label: string }>;
};

const FooterSimple: React.FC<FooterSimpleProps> = ({ links }: FooterSimpleProps) => {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => {
        event.preventDefault();
      }}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo />
        <Group className={classes.links}>
          {items}
          <Button
            component="a"
            href="https://github.com/yavuzyalcintas/planhero"
            variant="default"
            target="_blank"
            leftIcon={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default FooterSimple;
