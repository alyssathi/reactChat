import React, { useState } from "react";
import { ConversationList } from "./conversationList";
import { CreateConversation } from "./createConversation";

export function Conversations({ handleConversation, filteredConversations }) {
  const [selected, setSelected] = useState(null);

  function handleSelected(id) {
    setSelected(id);
  }

  return (
    <div>
      <CreateConversation
        handleSelected={handleSelected}
        filteredConversations={filteredConversations}
        handleConversation={handleConversation}
      />
      <ConversationList
        selected={selected}
        handleSelected={handleSelected}
        handleConversation={handleConversation}
        filteredConversations={filteredConversations}
      />
    </div>
  );
}
