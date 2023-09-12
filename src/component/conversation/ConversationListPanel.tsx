import {useContext, useEffect, useState} from "react";
import {DocumentContext} from "../../page/document/Document";
import {useFirebase} from "../../hook/UseFirebase";
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {onValue, ref} from "@firebase/database";
import {Conversation} from "../../types";
import {Button, Col} from "antd";
import styled from "styled-components";
import theme from "../../theme";
import Title from "../custom/Title";
import Layout, {Content, Header} from "../Layout";
import {DateTime} from "luxon";


const ConversationListPanel = () => {
  const document = useContext(DocumentContext);
  const {userId} = useGoogleAuth();
  const {db} = useFirebase();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    if (!db || !document || !userId) return;
    const refConversations = ref(db, `users/${userId}/conversations/${document.hash_name}`);
    const unsubscribe = onValue(refConversations, (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val() || {};
      const datasource = Object.keys(data).map((key) => {
        const {create_time, ...question_answers} = data[key];
        return {
          create_time: create_time, conversation_id: key, question_answers: Object.keys(question_answers).map((key) => {
            return {...question_answers[key], create_time: key};
          })
        };
      });
      setConversations(datasource);
      console.log(data);
      /*
      set key as key of object
       */
    });
    return () => unsubscribe();
  }, [db, document, userId]);
  return <PanelStyled>
    <Header>
      <Title level={4} color={theme.colors.color_5}>Conversations</Title>
    </Header>
    <Content>
      {conversations.map((conversation) => {
        return <Col key={conversation.conversation_id}>
          <Button
            type={"link"}>{DateTime.fromMillis(conversation.create_time, {zone: 'utc'}).toFormat('yyyy/MM/dd HH:mm:ss')}</Button>
        </Col>
      })}
    </Content>
  </PanelStyled>
    ;
}

const PanelStyled = styled(Layout)`
`
export default ConversationListPanel;