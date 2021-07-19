import React from "react";
import { ConversationList } from "./conversationList";
import { CreateConversation } from "./createConversation";

export function Conversations({ handleConversation, filteredConversations }) {
  return (
    <div>
      <CreateConversation />
      <ConversationList
        handleConversation={handleConversation}
        filteredConversations={filteredConversations}
      />
    </div>
  );
}
