import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import ErrorText from "../../components/ErrorText/ErrorText";
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import logging from "../../config/logging";
import IPageProps from "../../interfaces/page";
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
} from "@mantine/core";

const LoginPage: React.FC<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const login = () => {
    if (error !== "") setError("");

    setAuthenticating(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        navigate("/");
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  const loginAnonymously = () => {
    if (error !== "") setError("");

    setAuthenticating(true);

    signInAnonymously(auth)
      .then((result) => {
        logging.info(result);
        navigate("/");
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <AuthContainer header="">
      {/* <form>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </form>
      <form>
        <input
          autoComplete="new-password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </form>
      <button disabled={authenticating} color="success" onClick={() => login()}>
        Login
      </button>
      <small>
        <p className="m-1 text-center">
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
      </small>
      <ErrorText error={error} />
      <hr className="bg-info m-3" />
      <button
        disabled={authenticating}
        color="success"
        onClick={() => loginAnonymously()}
      >
        Continue as Guest
      </button> */}

      <Container size={420} my={40}>
      <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome to 
        </Title>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Fantasy Fridge!
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            mt="md"
          />
          <ErrorText error={error} />
          <Group position="center" mt="lg">
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Don't have an account yet?{" "}
              <Anchor
                size="sm"
                component="button"
                onClick={() => navigate("/register")}
              >
                Register
              </Anchor>
            </Text>
          </Group>
          <Button
            disabled={authenticating}
            color="success"
            onClick={() => login()}
            variant="gradient"
            gradient={{ from: "teal", to: "orange" }}
            fullWidth
            mt="xl"
          >
            Login
          </Button>
          <Button
            disabled={authenticating}
            color="success"
            onClick={() => loginAnonymously()}
            variant="gradient"
            gradient={{ from: "orange", to: "cyan" }}
            fullWidth
            mt="xl"
          >
            Continue as Guest
          </Button>
        </Paper>
      </Container>
    </AuthContainer>
  );
};

export default LoginPage;
