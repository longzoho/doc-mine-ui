import React, {useContext, useRef} from 'react'
import {Button, Col, Form, Input, message, Row} from "antd";
import {useAuthPost} from "../hook/useAuthPost";
import theme from "../theme";
import styled from "styled-components";
import {FormInstance} from "antd/es/form/hooks/useForm";
import ConversationContext from "./conversation/ConversationContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";

const {TextArea} = Input;

interface ChatInputProps {
  conversation_key: string | undefined
}

const ChatInput = (props: ChatInputProps) => {
  const {post} = useAuthPost('/api/conversation/ask');
  const ref = useRef<FormInstance>(null);
  const [submitAble, setSubmitAble] = React.useState(true);
  const {conversationId, setConversationId} = useContext(ConversationContext);

  const onSummit = (values: any) => {
    setSubmitAble(false);
    post({...values, conversation_key: props.conversation_key, conversation_id: conversationId}, {
      onSuccess: (data) => {
        setConversationId(data.conversation_id);
        setSubmitAble(true);
      },
      onError: (error: any) => {
        message.error(error?.message || 'Error');
        setSubmitAble(true);
      }
    })
    ref?.current?.resetFields();
  }

  return <Form onFinish={(values) => {
    onSummit(values);
  }} className={'ask-form'} ref={ref}>
    <Row gutter={10}>
      <Col flex={'1 1 0'}>
        <Form.Item name={'question_text'} rules={[
          {
            required: true,
            message: 'Please input your question!',
            validateTrigger: 'onSubmit'
          }
        ]}>
          <TextArea placeholder={'Ask a question'} autoSize={{minRows: 3, maxRows: 20}}/>
        </Form.Item>
      </Col>
      <Col flex={'0 0 auto'}>
        <Form.Item>
          <ButtonStyled htmlType={'submit'} disabled={!submitAble} icon={<FontAwesomeIcon
            icon={faCommentDots}/>}></ButtonStyled>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}

const ButtonStyled = styled(Button)`
  font-size: 32px;
  line-height: 32px;
  border: none;
  background: none;
  padding: 10px;
`;

export default ChatInput;