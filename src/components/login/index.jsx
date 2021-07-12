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

export function LogIn() {
  const css = useStyles();

  return (
    <Card className={`${css.center}`}>
      <h2>Login</h2>
      <form className={`${css.center}`}>
        <TextField required fullWidth label="Email" type="email" />
        <TextField required fullWidth label="Password" type="password" />
        <Button fullWidth type="submit">
          Log In
        </Button>
      </form>
    </Card>
  );
}
