import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconLogout,
  IconDeviceGamepad,
  IconMessages,
} from "@tabler/icons";
import Logo from "./Logo";
import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: 70,
    height: 70,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const menuItems = [
  { icon: IconHome2, label: "Home", to: "/" },
  { icon: IconDeviceGamepad, label: "Scrum Poker", to: "/scrum-poker" },
  { icon: IconMessages, label: "Retrospective", to: "/retro" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const user = useAuth();

  const links = menuItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.to);
      }}
    />
  ));

  const logout = async () => {
    supabase.auth.signOut();
  };

  return (
    <>
      {user && (
        <Navbar style={{ position: "fixed" }} width={{ base: 100 }} p="md">
          <Center mt={25}>
            <Logo />
          </Center>
          <Navbar.Section grow mt={70}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavbarLink icon={IconLogout} label="Logout" onClick={logout} />
            </Stack>
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
}
