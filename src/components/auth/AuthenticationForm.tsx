import type { PaperProps } from "@mantine/core";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

import { Profiles } from "../../models/supabaseEntities";
import { supabase } from "../../utilities/supabase";

export function AuthenticationForm(props: PaperProps) {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
      //name: (val) => (val.length > 0 && type === "login" ? null : "Name required"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (type === "register") {
      const { error, user } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        showNotification({
          title: "Register Error",
          message: error.message,
          color: "red",
        });
        return;
      }

      if (user) {
        const { error } = await supabase
          .from<Profiles>("profiles")
          .insert({ id: user.id, full_name: values.name });

        if (error) {
          showNotification({
            title: "Register Error",
            message: error.message,
            color: "red",
          });
          return;
        }

        navigate("/");
      }
    }

    if (type === "login") {
      const { error, user } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });

      if (error) {
        showNotification({
          title: "Login Error",
          message: error.message,
          color: "red",
        });
      }

      if (user) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to PlanHero,
        </Text>

        <Group grow mb="md" mt="md">
          {/* <GoogleButton radius='xl'>Google</GoogleButton> */}
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => {
                  form.setFieldValue("name", event.currentTarget.value);
                }}
                error={form.errors.name && "Name required"}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@planhero.app"
              value={form.values.email}
              onChange={(event) => {
                form.setFieldValue("email", event.currentTarget.value);
              }}
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => {
                form.setFieldValue("password", event.currentTarget.value);
              }}
              error={form.errors.password && "Password should include at least 6 characters"}
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => {
                  form.setFieldValue("terms", event.currentTarget.checked);
                }}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="yellow"
              onClick={() => {
                toggle();
              }}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>

            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
