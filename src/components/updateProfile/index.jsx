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

export function UpdateProfile() {
  const css = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords must match.");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update Account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className={css.container}>
      <Card className={`${css.card}`}>
        <Typography variant="h2">Update Profile</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} className={`${css.center}`}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            inputRef={emailRef}
            defaultValue={currentUser.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
            placeholder="leave blank to keep the same"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            inputRef={passwordConfirmRef}
            placeholder="leave blank to keep the same"
          />
          <Button disabled={loading} fullWidth type="submit">
            Update
          </Button>
        </form>
        <div>
          <Typography>
            <Link to="/">Cancel</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
