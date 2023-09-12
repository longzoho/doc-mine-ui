import {createContext} from "react";

interface ConversationContextType {
  conversationId?: string;
  setConversationId: (id: string) => void;
}

const ConversationContext = createContext<ConversationContextType>({
  setConversationId: (id: string) => {
  },
});

export default ConversationContext;