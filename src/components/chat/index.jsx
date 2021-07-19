import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../firebase/firebase";
import { SendMessage } from "../sendMessage";

export function Chat({ selectedConversation }) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("conversations")
      .doc(selectedConversation)
      .collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [selectedConversation]);

  return (
    <div className="msgs">
      {messages.map(({ id, text, uid }) => (
        <div
          key={id}
          className={`msg ${
            uid === auth.currentUser.uid ? "sent" : "recieved"
          }`}
        >
          <p>{text}</p>
        </div>
      ))}
      <SendMessage
        selectedConversation={selectedConversation}
        scroll={scroll}
      />
      <div ref={scroll}></div>
    </div>
  );
}
