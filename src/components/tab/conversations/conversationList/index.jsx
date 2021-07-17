import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebase/firebase";

export function ConversationList() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    db.collection("conversations")
      .orderBy("lastUsed", "desc")
      .onSnapshot((snapshot) => {
        setConversations(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      {conversations.map(({ chatName, lastUsed, participants }) => (
        <div key={lastUsed}>
          <p>{chatName}</p>
        </div>
      ))}
    </div>
  );
}
