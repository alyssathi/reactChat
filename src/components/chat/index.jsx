import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { SendMessage } from "../sendMessage";

export function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      {messages.map(({ id, text }) => (
        <div key={id}>
          <p>{text}</p>
        </div>
      ))}
      <SendMessage />
    </div>
  );
}
