import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  sendMsg: {
    position: "fixed",
    display: "flex",
    bottom: "0",
    borderTop: "1px solid lightgray",
    padding: "1rem",
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export function CreateConversation() {
  const [conversationName, setConversationName] = useState("");
  const css = useStyles();

  async function handleSend(e) {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await db.collection("conversations").add({
      chatName: conversationName,
      participants: uid,
      lastUsed: serverTimestamp(),
    });

    setConversationName("");
  }
  return (
    <form onSubmit={handleSend}>
      <div className={css.sendMsg}>
        <Input
          fullWidth
          value={conversationName}
          onChange={(e) => setConversationName(e.target.value)}
          placeholder="Start a New Conversation..."
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
