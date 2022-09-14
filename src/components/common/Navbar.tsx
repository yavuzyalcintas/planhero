import { Center, createStyles, Navbar, Stack, Text, Tooltip, UnstyledButton } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";
import { IconDeviceGamepad, IconHome2, IconLogout, IconMessages } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../utilities/authProvider";
import { supabase } from "../../utilities/supabase";
import Logo from "./Logo";

const useStyles = createStyles((theme) => ({
  link: {
    width: 85,
    height: 85,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

type NavbarLinkProps = {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
};

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
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

const NavbarMinimal: React.FC = () => {
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
        <Navbar style={{ position: "fixed" }} width={{ base: 120 }} p="md">
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
              Hi,{" "}
              <Text
                color="yellow"
                size={16}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <b>{user.user_metadata?.name}</b>
              </Text>
              <NavbarLink icon={IconLogout} label="Logout" onClick={logout} />
            </Stack>
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
};

export default NavbarMinimal;
