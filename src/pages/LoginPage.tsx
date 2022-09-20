import { Center, Grid, Stack } from "@mantine/core";
import React from "react";

import { AuthenticationForm } from "../components/auth/AuthenticationForm";
import Logo, { LogoSize, LogoType } from "../components/common/Logo";

const LoginPage: React.FC = () => (
  <Center>
    <Grid style={{ width: 600 }}>
      <Grid.Col>
        <Stack>
          <Center>
            <Logo size={LogoSize.Medium} type={LogoType.Full} />
          </Center>
          <AuthenticationForm />
        </Stack>
      </Grid.Col>
    </Grid>
  </Center>
);

export default LoginPage;
