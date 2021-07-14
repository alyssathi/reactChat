import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "./../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "33vw",
    maxWidth: "33vw",
    padding: "rem",
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
    <Card className={`${css.center}`}>
      <h2>Log In</h2>
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
        <Button disabled={loading} fullWidth type="submit">
          Login
        </Button>
      </form>
      <Typography>
        Need an account? <Link to="/signup">Sign up here</Link>
      </Typography>
    </Card>
  );
}
