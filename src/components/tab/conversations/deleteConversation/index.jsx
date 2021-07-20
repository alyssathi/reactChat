import React from "react";
import { Typography } from "@material-ui/core";
import { db, auth } from "../../../../firebase/firebase";
import { SimpleModal } from "../../../modal";

export function DeleteConversation({ id, chatName }) {
  async function handleSend() {
    const { uid } = auth.currentUser;

    await await db
      .collection("conversations")
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <SimpleModal modalName="Delete" onSubmit={handleSend}>
      <Typography>
        Are you sure you want to delete {chatName} from your contacts list?
      </Typography>
    </SimpleModal>
  );
}
