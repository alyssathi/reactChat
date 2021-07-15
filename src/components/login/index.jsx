import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "./../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "33vw",
    maxWidth: "50vw",
    padding: "1rem",
    textAlign: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(white, grey)",
  },
});

export function LogIn() {
  const css = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }
  return (
    <div className={css.container}>
      <Card className={`${css.card}`}>
        <Typography variant="h2">Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} className={`${css.center}`}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            inputRef={emailRef}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
          />
          <Typography>
            <Link to="/forgot-password">Forgot Password? </Link>
          </Typography>
          <Button disabled={loading} fullWidth type="submit">
            Login
          </Button>
        </form>
        <Typography>
          Need an account? <Link to="/signup">Sign up here</Link>
        </Typography>
      </Card>
    </div>
  );
}
