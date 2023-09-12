import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Collapse, Row} from "antd";
import {Conversation, QuestionAnswer} from "../../types";
import QuestionAnswerItem from "./QuestionAnswerItem";
import styled from "styled-components";
import {useFirebase} from "../../hook/UseFirebase";
import {PageContext} from "../../App";
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {onValue, ref} from "@firebase/database";
import Paragraph from "../custom/Paragraph";
import theme from "../../theme";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {DateTime} from "luxon";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface ConversationViewProps {
  conversation_key: string,
  type: 'Document' | 'Profile'
}

const ConversationsView = (props: ConversationViewProps) => {
  const {db} = useFirebase();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const {setConversations: setConversationsPageContext} = useContext(PageContext);
  const {userId} = useGoogleAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!db || !document || !userId) return;
    const refConversation = ref(db, `users/${userId}/conversations/${props.conversation_key}`);
    const unsubscribe = onValue(refConversation, (snapshot) => {
      const data = snapshot.val() || {};
      /*
      set key as key of object
       */
      let datasource = Object.keys(data).map((key) => {
        const {create_time, ...question_answers} = data[key];
        return {
          create_time: create_time,
          conversation_id: key,
          question_answers: Object.keys(question_answers).map((key): QuestionAnswer => {
            return {...question_answers[key], create_time: key};
          })
        };
      }).sort((a, b) => a.create_time - b.create_time);
      setConversations(datasource);
      setConversationsPageContext(datasource);
    });
    return () => unsubscribe();
  }, [db, document, userId]);
  return (
    <CollapseStyled collapsible={'icon'}
                    expandIcon={(panelProps) => {
                      if (panelProps.isActive)
                        return <FontAwesomeIcon icon={faChevronDown}
                                                style={{color: theme.colors.color_4, fontSize: 36}}/>
                      return <FontAwesomeIcon icon={faChevronDown} style={{color: theme.colors.color_5, fontSize: 36}}/>
                    }}
                    expandIconPosition={'end'}
                    items={conversations.map(conversation => conversationToItem(conversation, props, navigate))}
                    className={'conversations-view'}/>
  )
}

const conversationToItem = (conversation: Conversation, props: ConversationViewProps, navigate: NavigateFunction) => {
  return {
    key: conversation.conversation_id,
    label:
      <Row>
        <Col span={24}>
          <Row>
            <Col flex={"1 1 auto"}>
              <Paragraph
                color={theme.colors.color_5}>{DateTime.fromMillis(conversation.create_time, {zone: 'utc'}).toFormat('yyyy/MM/dd HH:mm:ss')}</Paragraph>
            </Col>
            <Col flex={"0 1 200"}><Button type={'dashed'} style={{background: "none"}} onClick={() => {
              props.type === 'Document' ? navigate(`/document/${props.conversation_key}/conversation/${conversation.conversation_id}`) : navigate(`/profile/${props.conversation_key}/conversation/${conversation.conversation_id}`)
            }}>Continue with this
              conversation</Button></Col>
          </Row>
        </Col>
      </Row>,
    children: <Row justify={'center'}>
      {conversation.question_answers?.map((question_answer) => {
        return <Col span={24} key={question_answer.create_time}><QuestionAnswerItem question_answer={question_answer}
                                                                                    key={question_answer.create_time}/></Col>
      })}
    </Row>
  }
}

const CollapseStyled = styled(Collapse)`
  min-width: 100%;
  border-radius: 0;
  background-color: ${({theme}) => theme.colors.gray};

  .ant-collapse-content {
    .ant-collapse-content-box {
      padding: 0;
    }

    background-color: ${({theme}) => theme.colors.gray};
  }

  &.ant-collapse > .ant-collapse-item:last-child {
    border-radius: 0;
  }
`

export default ConversationsView;