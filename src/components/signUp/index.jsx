import { Button, Card, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";

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

export function SignUp() {
  const css = useStyles();

  return (
    <Card className={`${css.center}`}>
      <h2>Sign Up</h2>
      <form className={`${css.center}`}>
        <TextField required fullWidth label="Email" type="email" />
        <TextField required fullWidth label="Password" type="password" />
        <TextField
          required
          fullWidth
          label="Confirm Password"
          type="password"
        />
        <Button fullWidth type="submit">
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
