import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../firebase/firebase";
import { makeStyles } from "@material-ui/core";
import { nanoid } from "nanoid";

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

export function SendMessage({ scroll, selectedConversation }) {
  const [msg, setMsg] = useState("");
  const css = useStyles();

  async function handleSend(e) {
    e.preventDefault();
    if (msg.trim() === "") return;
    const { uid } = auth.currentUser;

    await db
      .collection("conversations")
      .doc(selectedConversation)
      .collection("messages")
      .add({
        text: msg.trim(),
        uid,
        createdAt: serverTimestamp(),
        id: nanoid(),
      });
    await db
      .collection("conversations")
      .doc(selectedConversation)
      .update({ lastUsed: serverTimestamp() });
    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <form onSubmit={handleSend}>
      <div className={css.sendMsg}>
        <Input
          fullWidth
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={
            selectedConversation === "starter"
              ? "Please select a conversation!"
              : "Message..."
          }
          disabled={selectedConversation === "starter" ? true : false}
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}
