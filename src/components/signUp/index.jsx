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

export function SignUp() {
  const css = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords must match.");
    }

    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value);
      history.push("/login");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className={css.container}>
      <Card className={`${css.card}`}>
        <Typography variant="h2">Sign Up</Typography>
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
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type="password"
            inputRef={passwordConfirmRef}
          />
          <Button disabled={loading} fullWidth type="submit">
            Sign Up
          </Button>
        </form>
        <div>
          <Typography>
            Already have an account? <Link to="/login">Sign in here</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
