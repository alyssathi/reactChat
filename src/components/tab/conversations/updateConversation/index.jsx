import React, { useRef } from "react";
import { Input } from "@material-ui/core";
import { db } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";
export function UpdateConversation({ id, chatName }) {
  const chatNameRef = useRef();

  async function handleSend() {
    if (chatNameRef.current.value.trim() === "") {
      return alert("please enter a valid chat name.");
    }
    await db.collection("conversations").doc(id).update({
      chatName: chatNameRef.current.value,
    });
  }
  return (
    <SimpleModal modalName="Edit" onSubmit={handleSend}>
      <Input
        required
        fullWidth
        inputProps={{ maxlength: 20 }}
        inputRef={chatNameRef}
        defaultValue={chatName}
      />
    </SimpleModal>
  );
}
