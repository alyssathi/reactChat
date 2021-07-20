import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { UpdateContact } from "../updateContact";
import { DeleteContact } from "../deleteContact";

const useStyles = makeStyles({
  contacts: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid lightgray",
    padding: "1rem",
    width: "100%",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
    dateColor: {
      color: "lightgray",
    },
  },
  list: {
    height: "70vh",
    overflow: "scroll",
    paddingBottom: "2rem",
  },
});

export function ContactList({ contacts }) {
  const css = useStyles();

  return (
    <div className={css.list}>
      {contacts.map(({ displayName, contactUid, createdAt, contactId }) => {
        return (
          <div className={css.contacts} key={createdAt}>
            <Typography variant="body1">
              <div>{displayName}</div>
              <div>ID: {contactUid}</div>
            </Typography>
            <UpdateContact
              contactId={contactId}
              contactUid={contactUid}
              displayName={displayName}
            />
            <DeleteContact contactId={contactId} displayName={displayName} />
          </div>
        );
      })}
    </div>
  );
}
