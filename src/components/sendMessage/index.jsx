import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../firebase/firebase";

export function SendMessage({ scroll }) {
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
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div>
      <form onSubmit={handleSend}>
        <div className="sendMsg">
          <Input
            fullWidth
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message..."
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}
