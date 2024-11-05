import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';

export default function AuthenticationTitle({ onLogin, authLoading }) {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onLogin}>
          <TextInput label="Email" placeholder="you@mantine.dev" name="email" required />
          <PasswordInput label="Password" placeholder="Your password" name="password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" loading={authLoading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
