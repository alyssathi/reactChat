import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../firebase/firebase";
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

export function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  const css = useStyles();

  async function handleSend(e) {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await db.collection("messages").add({
      text: msg,
      uid,
      createdAt: serverTimestamp(),
    });

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
          placeholder="Message..."
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}
