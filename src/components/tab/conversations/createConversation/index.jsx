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
    if (
      chatNameRef.current.value.trim() === "" ||
      participantRef.current.value.trim() === ""
    ) {
      return alert("please enter a valid chat name or friends ID.");
    }
    await db
      .collection("conversations")
      .doc(idRef.current.value)
      .set({
        chatName: chatNameRef.current.value.trim(),
        id: idRef.current.value,
        participants: [uid, participantRef.current.value.trim()],
        lastUsed: serverTimestamp(),
      });
  }

  return (
    <SimpleModal modalName="Create Conversation" onSubmit={handleSend}>
      <Input
        required
        fullWidth
        inputProps={{ maxlength: 20 }}
        inputRef={chatNameRef}
        placeholder="Name your Conversation"
      />
      <Input
        required
        fullWidth
        inputProps={{ maxlength: 21 }}
        inputRef={participantRef}
        placeholder="Friend's User ID"
      />
      <Input className={css.hide} inputRef={idRef} value={nanoid()} />
    </SimpleModal>
  );
}
