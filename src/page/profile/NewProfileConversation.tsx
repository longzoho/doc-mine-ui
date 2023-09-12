import React, {useContext} from 'react'
import NewConversation from "../../component/conversation/NewConversation";
import {ProfileContext} from "./Profile";

const NewProfileConversation = () => {
  const profile = useContext(ProfileContext);
  if (!profile) return <></>;
  return <NewConversation conversation_key={profile?.profile_id!}/>;
}

export default NewProfileConversation;