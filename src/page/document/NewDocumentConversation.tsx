import React, {useContext} from 'react'
import {DocumentContext} from "./Document";
import ChatConversation from "../../component/conversation/ChatConversation";

const NewDocumentConversation = () => {
  const document = useContext(DocumentContext);
  if (!document) return <></>;
  return <ChatConversation conversation_key={document.hash_name}/>
}

export default NewDocumentConversation;