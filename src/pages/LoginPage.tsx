import React from "react";
import { Center, Grid, Stack } from "@mantine/core";
import { AuthenticationForm } from "../components/auth/AuthenticationForm";
import Logo from "../components/common/Logo";

const LoginPage: React.FC = () => (
  <Center>
    <Grid style={{ width: 600 }}>
      <Grid.Col>
        <Stack mt={150}>
          <Logo fontSize={60} />
          <AuthenticationForm />
        </Stack>
      </Grid.Col>
    </Grid>
  </Center>
);

export default LoginPage;
