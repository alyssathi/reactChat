import React from "react";
import { ConversationList } from "./conversationList";
import { CreateConversation } from "./createConversation";

export function Conversations() {
  return (
    <div>
      <CreateConversation />
      <ConversationList />
    </div>
  );
}
