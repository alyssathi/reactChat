import React, { useState, useEffect } from "react";
import { List, ListItem, Typography } from "@material-ui/core";
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
          </ListItem>
        );
      })}
    </List>
  );
}
