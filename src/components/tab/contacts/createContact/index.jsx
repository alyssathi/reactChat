import React, { useRef } from "react";
import { Input } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";

export function CreateContact() {
  const displayNameRef = useRef();
  const contactUidRef = useRef();

  async function handleSend() {
    const { uid } = auth.currentUser;

    await db.collection("users").doc(uid).collection("contacts").add({
      displayName: displayNameRef.current.value,
      contactUid: contactUidRef.current.value,
      createdAt: serverTimestamp(),
    });
  }
  return (
    <SimpleModal modalName="Create Contact" onSubmit={handleSend}>
      <Input required fullWidth inputRef={displayNameRef} placeholder="Name" />
      <Input
        required
        fullWidth
        inputRef={contactUidRef}
        placeholder="User ID"
      />
    </SimpleModal>
  );
}
