import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../firebase/firebase";
import { SendMessage } from "../sendMessage";

export function Chat({ selectedConversation, contacts }) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [currentContactUid, setCurrentContactUid] = useState([]);

  useEffect(() => {
    db.collection("conversations")
      .doc(selectedConversation)
      .collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    db.collection("conversations")
      .doc(selectedConversation)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentContactUid(
            doc
              .data()
              .participants.filter(
                (participant) => participant !== auth.currentUser.uid
              )
              .toString()
          );
        } else {
          console.log("doesnt exist!");
        }
      });
  }, [selectedConversation]);

  const hasContact = contacts.some(
    (contact) => contact.contactUid === currentContactUid
  );

  const currentContactObj = contacts.filter(
    (contact) => contact.contactUid === currentContactUid
  );
  console.log(currentContactObj);
  return (
    <div className="msgs">
      {messages.map(({ id, text, uid }) => (
        <div
          key={id}
          className={`msg ${
            uid === auth.currentUser.uid ? "sent" : "recieved"
          }`}
        >
          <p className={uid !== auth.currentUser.uid ? "uid" : "self"}>
            {hasContact ? currentContactObj[0].displayName : uid}
          </p>
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
