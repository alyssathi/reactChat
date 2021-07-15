import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "./../../contexts/AuthContext";
import { Link } from "react-router-dom";

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

export function ForgotPassword() {
  const css = useStyles();

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }
  return (
    <div className={css.container}>
      <Card className={`${css.card}`}>
        <Typography variant="h2">Password Reset</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <form onSubmit={handleSubmit} className={`${css.center}`}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            inputRef={emailRef}
          />
          <Button disabled={loading} fullWidth type="submit">
            Reset Password
          </Button>
        </form>
        <Typography>
          Know your account details? <Link to="/login">Log in here</Link>
        </Typography>
        <Typography>
          Need an account? <Link to="/signup">Sign up here</Link>
        </Typography>
      </Card>
    </div>
  );
}
