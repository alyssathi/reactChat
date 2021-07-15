import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../firebase/firebase";

export function SendMessage() {
  const [msg, setMsg] = useState("");

  async function handleSend(e) {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await db.collection("messages").add({
      text: msg,
      uid,
      createdAt: serverTimestamp(),
    });

    setMsg("");
  }
  return (
    <div>
      <form onSubmit={handleSend}>
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
