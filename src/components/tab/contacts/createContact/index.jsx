import React, { useState, useRef } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  createContact: {
    position: "fixed",
    display: "flex",
    bottom: "0",
    borderTop: "1px solid lightgray",
    padding: "1rem",
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export function CreateContact() {
  const [conversationName, setConversationName] = useState("");
  const css = useStyles();
  const contactRef = useRef();

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
      <div className={css.createContact}>
        <Input fullWidth inputRef={contactRef} placeholder="Add a Friend..." />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
