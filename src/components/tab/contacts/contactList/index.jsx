import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebase/firebase";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  contacts: {
    display: "flex",
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
    height: "100vh",
    overflow: "scroll",
    paddingBottom: "3rem",
  },
});

export function ContactList() {
  const [contacts, setContacts] = useState([]);
  const { uid } = auth.currentUser;
  const css = useStyles();

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("contacts")
      .orderBy("displayName")
      .onSnapshot((snapshot) => {
        setContacts(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className={css.list}>
      {contacts.map(({ displayName, contactUid, createdAt }) => {
        return (
          <div className={css.contacts} key={createdAt}>
            <Typography variant="body1">
              <div>{displayName}</div>
              <div>ID: {contactUid}</div>
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
