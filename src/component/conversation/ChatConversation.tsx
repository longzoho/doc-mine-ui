import React, {useEffect, useState} from 'react';
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {useFirebase} from "../../hook/UseFirebase";
import {QuestionAnswer} from "../../types";
import {Col, Row} from "antd";
import {onValue, ref} from "@firebase/database";
import QuestionAnswerItem from "../../component/conversation/QuestionAnswerItem";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import ConversationContext from "./ConversationContext";
import ChatInput from "../ChatInput";

interface ChatConversationProps {
  conversation_key: string
}

const ChatConversation = (props: ChatConversationProps) => {
  const {userId} = useGoogleAuth();
  const {db} = useFirebase();
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
  const {conversation_id} = useParams();
  const [conversationId, setConversationId] = useState<string>();
  useEffect(() => {
    if (!conversation_id) return;
    setConversationId(conversation_id);
  }, [conversation_id]);

  useEffect(() => {
    if (!db || !document || !userId || !conversationId) return;
    const refConversations = ref(db, `users/${userId}/conversations/${props.conversation_key}/${conversationId}`);
    const unsubscribe = onValue(refConversations, (snapshot) => {
      const {create_time, ...question_answers} = snapshot.val() || {};
      const questionAnswers = Object.keys(question_answers).map((key) => {
        return {...question_answers[key], create_time: key};
      });
      setQuestionAnswers(questionAnswers);
    });
    return () => unsubscribe();
  }, [db, document, userId, conversationId]);

  return (
    <ConversationContext.Provider value={{
      conversationId: conversationId, setConversationId: setConversationId
    }}>
      <ConversationContentStyled>
        <div className={'question-answers'}>
          <Row justify={"center"}>
            <Col span={16}>
              <Row>
                {questionAnswers.map((questionAnswer) => {
                  return <Col span={24} key={questionAnswer.create_time}>
                    <QuestionAnswerItem question_answer={questionAnswer}/>
                  </Col>
                })}
              </Row>
            </Col>
          </Row>
        </div>
        <div className={'ask-form'}>
          <Row justify={"center"}>
            <Col span={16}>
              <Row justify={'center'}>
                <Col span={20}>
                  <ChatInput conversation_key={props.conversation_key}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </ConversationContentStyled>
    </ConversationContext.Provider>
  )
}


const ConversationContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .question-answers {
    flex: 1 1 0;
    overflow-y: auto;
  }

  .ask-form {
    flex: 0 0 auto;
    margin-top: 10px;
  }
`

export default ChatConversation;