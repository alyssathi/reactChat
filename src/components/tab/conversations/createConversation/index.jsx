import React, { useRef } from "react";
import { Input } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { SimpleModal } from "./../../../modal/index";
import { nanoid } from "nanoid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  hide: {
    display: "none",
  },
});

export function CreateConversation() {
  const css = useStyles();
  const chatNameRef = useRef();
  const participantRef = useRef();
  const idRef = useRef();

  async function handleSend() {
    const { uid } = auth.currentUser;
    await db
      .collection("conversations")
      .doc(idRef.current.value)
      .set({
        chatName: chatNameRef.current.value,
        id: idRef.current.value,
        participants: [uid, participantRef.current.value],
        lastUsed: serverTimestamp(),
      });
  }

  return (
    <SimpleModal modalName="Create Conversation" onSubmit={handleSend}>
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
      <Input className={css.hide} inputRef={idRef} value={nanoid()} />
    </SimpleModal>
  );
}
