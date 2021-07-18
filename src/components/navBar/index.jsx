import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    color: "white",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  mainContainer: {
    display: "flex",
  },
});

export function NavBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const css = useStyles();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to Logout");
    }
  }

  function handleProfile() {
    return history.push("/update-profile");
  }

  return (
    <AppBar>
      <Toolbar className={css.toolbar}>
        <Typography>
          Welcome to ReactChat,{" "}
          {currentUser.displayName ? currentUser.displayName : "Stranger"}!
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <div>
          <Button className={css.button} onClick={handleProfile}>
            Update Profile
          </Button>
          <Button className={css.button} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
