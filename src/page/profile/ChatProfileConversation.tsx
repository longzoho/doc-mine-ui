import React from 'react';
import ChatConversation from "../../component/conversation/ChatConversation";
import {useParams} from "react-router-dom";

const ChatProfileConversation = () => {
  const {profile_id} = useParams();
  return <ChatConversation conversation_key={profile_id!}/>;
}
export default ChatProfileConversation;