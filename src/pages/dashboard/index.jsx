import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import { Chat } from "../../components/chat";
import { SimpleTabs } from "../../components/tab";
import { makeStyles } from "@material-ui/core";
import { NavBar } from "../../components/navBar/index";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    marginTop: "64px",
  },
});

export function Dashboard() {
  const css = useStyles();
  const [selectedConversation, setSelectedConversation] = useState("starter");
  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);

  //setting my CONTACTS state
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("contacts")
      .orderBy("displayName")
      .onSnapshot((snapshot) => {
        setContacts(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  //setting my CONVERSATIONS state
  useEffect(() => {
    db.collection("conversations")
      .orderBy("lastUsed", "desc")
      .onSnapshot((snapshot) => {
        setConversations(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.participants.includes(auth.currentUser.uid)
  );

  function handleConversation(id) {
    return setSelectedConversation(id);
  }

  return (
    <>
      <NavBar />
      <div className={css.mainContainer}>
        <SimpleTabs
          handleConversation={handleConversation}
          filteredConversations={filteredConversations}
          contacts={contacts}
        />
        <Chat selectedConversation={selectedConversation} contacts={contacts} />
      </div>
      <div></div>
    </>
  );
}
