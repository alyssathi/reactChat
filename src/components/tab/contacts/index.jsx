import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { CreateContact } from "./createContact/index";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ContactList } from "./contactList/index";

const useStyles = makeStyles({
  yourId: {
    position: "fixed",
    bottom: "0",
    left: "0",
    borderTop: "1px solid lightgray",
    borderRight: "1px solid lightgray",
    padding: "1rem",
    backgroundColor: "#fafafa",
    width: "320px",
  },
});

export function Contacts({ contacts }) {
  const { currentUser } = useAuth();
  const css = useStyles();
  return (
    <div>
      <CreateContact />
      <ContactList contacts={contacts} />
      <div className={css.yourId}>
        <Typography display="inline" variant="body1">
          <b>Your userID: </b> {currentUser.uid}{" "}
        </Typography>
      </div>
    </div>
  );
}
