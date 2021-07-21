import React from "react";
import { Typography } from "@material-ui/core";
import { db, auth } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";

export function DeleteContact({ contactId, displayName }) {
  async function handleSend() {
    const { uid } = auth.currentUser;

    await db
      .collection("users")
      .doc(uid)
      .collection("contacts")
      .doc(contactId)
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <SimpleModal color="secondary" modalName="Delete" onSubmit={handleSend}>
      <Typography>
        Are you sure you want to delete {displayName} from your contacts list?
      </Typography>
    </SimpleModal>
  );
}
