import React, {useEffect, useState} from 'react'
import {onValue, ref} from "@firebase/database";
import {useFirebase} from "../../hook/UseFirebase";
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {QuestionAnswer} from "../../types";
import {Col, Form, Input, message, Row} from "antd";
import QuestionAnswerItem from "../../component/conversation/QuestionAnswerItem";
import {useAuthPost} from "../../hook/useAuthPost";
import styled from "styled-components";
import ChatInput from "../ChatInput";
import ConversationContext from "./ConversationContext";

interface NewConversationProps {
  conversation_key: string
}

const NewConversation = (props: NewConversationProps) => {
  const {userId} = useGoogleAuth();
  const {db} = useFirebase();
  const [conversationId, setConversationId] = useState<string>();
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

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
    <ConversationContext.Provider value={{conversationId: conversationId, setConversationId: setConversationId}}>
      <ConversationContentStyled>
        <div className={'question-answers'}>
          <Row justify={"center"}>
            <Col span={16}>
              <Row>
                {questionAnswers.map((questionAnswer) => {
                  return <Col span={24}>
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
    flex-grow: 1;
  }
`

export default NewConversation;