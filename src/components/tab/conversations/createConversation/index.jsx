import React, { useRef } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { makeStyles } from "@material-ui/core";
import { SimpleModal } from "./../../../modal/index";

const useStyles = makeStyles({
  createConvo: {
    position: "fixed",
    display: "flex",
    bottom: "0",
    borderTop: "1px solid lightgray",
    padding: "1rem",
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export function CreateConversation() {
  const chatNameRef = useRef();
  const participantRef = useRef();

  async function handleSend(e) {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await db.collection("conversations").add({
      chatName: chatNameRef.current.value,
      participants: [uid, participantRef.current.value],
      lastUsed: serverTimestamp(),
    });
  }

  return (
    <SimpleModal modalName="Create Conversation">
      <form onSubmit={handleSend}>
        <Input
          required
          fullWidth
          inputRef={chatNameRef}
          placeholder="Name your Conversation"
        />
        <Input
          required
          fullWidth
          inputRef={participantRef}
          placeholder="Friend's User ID"
        />
        <Button type="submit">Create Conversation</Button>
      </form>
    </SimpleModal>
  );
}
