import {Button, Col, Divider, Row} from "antd";
import ConversationsView from "../../component/conversation/ConversationsView";
import React from "react";
import styled from "styled-components";
import Layout, {Content} from "../../component/Layout";
import {useNavigate, useParams} from "react-router-dom";

const DocumentDetail = () => {
  const navigate = useNavigate();
  const {profile_id} = useParams();

  return (
    <Row justify={'center'} style={{display: "flex", height: "100%"}}>
      <Col xl={16}>
        <DocumentStyled>
          <ConversationContentStyled className={'conversation-content'}>
            <div className={'conversations-view'}>
              <ConversationsView type={'Profile'} conversation_key={profile_id!}/>
            </div>
            <DividerStyled>OR</DividerStyled>
            <div className={'new-conversation'}>
              <Button type={'dashed'} onClick={() => navigate(`/profile/${profile_id!}/new-conversation`)}>Start
                new conversation</Button>
            </div>
          </ConversationContentStyled>
        </DocumentStyled>
      </Col>
    </Row>
  )
}

const DocumentStyled = styled(Layout)`
  height: 100%;
  padding: 10px;
  background: none;
`
const ConversationContentStyled = styled(Content)`
  flex-direction: column;
  display: flex;
  background-color: ${({theme}) => theme.colors.gray};

  .conversations-view {
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(100vh - 264px);
  }

  .new-conversation {
    button {
      background: none;
      width: 100%;
      padding: 40px;
      line-height: 0;
      font-size: 24px;
    }
  }
`
const DividerStyled = styled(Divider)`
  &.ant-divider-horizontal.ant-divider-with-text {
    font-size: 32px;
    font-weight: bold;
  }
`
export default DocumentDetail;