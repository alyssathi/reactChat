import React, { useState } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to Logout");
    }
  }
  return (
    <>
      <Card>
        <h2>Profile</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <Typography>Email: {currentUser.email}</Typography>
        <Link to="/update-profile">Update Profile</Link>
      </Card>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}
