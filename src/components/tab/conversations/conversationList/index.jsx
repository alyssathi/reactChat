import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebase/firebase";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  convos: {
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
    height: "80vh",
    overflow: "scroll",
    paddingBottom: "2rem",
  },
});

export function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const css = useStyles();

  useEffect(() => {
    db.collection("conversations")
      .orderBy("lastUsed", "desc")
      .onSnapshot((snapshot) => {
        setConversations(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className={css.list}>
      {conversations.map(({ chatName, lastUsed, participants, id }) => {
        const lastUsedDate = lastUsed
          ? lastUsed.toDate().toLocaleString()
          : "now";
        return (
          <div className={css.convos} key={id}>
            <Typography className={css.convoTitle} variant="body1">
              <div>{chatName}</div>
              <div className={css.dateColor}>{lastUsedDate}</div>
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
