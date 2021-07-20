import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { DeleteConversation } from "../deleteConversation";
import { UpdateConversation } from "../updateConversation";

const useStyles = makeStyles({
  convos: {
    display: "flex",
    justifyContent: "space-between",
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
  buttons: {
    display: "flex",
    flexDirection: "column",
  },
});

export function ConversationList({
  handleConversation,
  filteredConversations,
}) {
  const css = useStyles();

  return (
    <List className={css.list}>
      {filteredConversations.map(({ chatName, lastUsed, participants, id }) => {
        const lastUsedDate = lastUsed
          ? lastUsed.toDate().toLocaleString()
          : "now";

        return (
          <ListItem
            onClick={() => handleConversation(id)}
            className={css.convos}
            key={id}
          >
            <Typography className={css.convoTitle} variant="body1">
              <div>{chatName}</div>
              <div className={css.dateColor}>{lastUsedDate}</div>
            </Typography>
            <div className={css.buttons}>
              <UpdateConversation id={id} chatName={chatName} />
              <DeleteConversation id={id} chatName={chatName} />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
}
