import React, { useRef } from "react";
import { Input } from "@material-ui/core";
import { db, auth } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";
export function UpdateContact({ contactId, displayName, contactUid }) {
  const displayNameRef = useRef();
  const contactUidRef = useRef();

  async function handleSend() {
    const { uid } = auth.currentUser;
    if (
      displayNameRef.current.value.trim() === "" ||
      contactUidRef.current.value.trim() === ""
    ) {
      return alert("please enter a valid name or id.");
    }

    await db
      .collection("users")
      .doc(uid)
      .collection("contacts")
      .doc(contactId)
      .update({
        displayName: displayNameRef.current.value.trim(),
        contactUid: contactUidRef.current.value.trim(),
      });
  }
  return (
    <SimpleModal modalName="Edit" onSubmit={handleSend}>
      <Input
        required
        fullWidth
        inputProps={{ maxlength: 20 }}
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
