import React, { useRef } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { makeStyles } from "@material-ui/core";
import { SimpleModal } from "../../../modal";

const useStyles = makeStyles({
  createContact: {
    position: "fixed",
    display: "flex",
    bottom: "0",
    borderTop: "1px solid lightgray",
    padding: "1rem",
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export function CreateContact() {
  const css = useStyles();
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
