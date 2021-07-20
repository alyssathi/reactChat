import React, { useRef } from "react";
import { Input } from "@material-ui/core";
import { db, auth, serverTimestamp } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";
import { nanoid } from "nanoid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  hide: {
    display: "none",
  },
});

export function CreateContact() {
  const displayNameRef = useRef();
  const contactUidRef = useRef();
  const contactIdRef = useRef();
  const css = useStyles();

  async function handleSend() {
    const { uid } = auth.currentUser;

    await db
      .collection("users")
      .doc(uid)
      .collection("contacts")
      .doc(contactIdRef.current.value)
      .set({
        displayName: displayNameRef.current.value,
        contactUid: contactUidRef.current.value,
        contactId: contactIdRef.current.value,
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
      <Input
        fullWidth
        className={css.hide}
        value={nanoid()}
        inputRef={contactIdRef}
      />
    </SimpleModal>
  );
}
