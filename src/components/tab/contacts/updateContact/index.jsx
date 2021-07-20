import React, { useRef } from "react";
import { Input } from "@material-ui/core";
import { db, auth } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";
export function UpdateContact({ contactId, displayName, contactUid }) {
  const displayNameRef = useRef();
  const contactUidRef = useRef();

  async function handleSend() {
    const { uid } = auth.currentUser;

    await db
      .collection("users")
      .doc(uid)
      .collection("contacts")
      .doc(contactId)
      .update({
        displayName: displayNameRef.current.value,
      });
  }
  return (
    <SimpleModal modalName="Edit" onSubmit={handleSend}>
      <Input
        required
        fullWidth
        inputRef={displayNameRef}
        defaultValue={displayName}
      />
      <Input
        required
        fullWidth
        inputRef={contactUidRef}
        defaultValue={contactUid}
      />
    </SimpleModal>
  );
}
