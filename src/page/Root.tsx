import React, {useContext} from "react";
import {Outlet} from "react-router-dom";
import {PageContext} from "../App";
import Layout, {Content, Header, Sider} from "../component/Layout";
import theme from "../theme";
import Title from "../component/custom/Title";
import {Breadcrumb, Col, Divider, Image, Typography, Row} from "antd";
import styled from "styled-components";
import {useGoogleAuth} from "../hook/UseGoogleAuth";
import MenuSidebar from "../component/MenuSidebar";
import {MenuOutlined} from "@ant-design/icons";
import {DateTime} from "luxon";

const {Paragraph} = Typography;

export default function Root() {
  const {pageTitle, documentName, documentSummary, conversations, breadcrumb} = useContext(PageContext);
  const {email} = useGoogleAuth();
  return (
    <MainLayoutStyled hasSider>
      <Sider bgcolor={theme.colors.gray_dark_2} width={320}>
        <Row style={{padding: "0 10px"}}>
          <Col span={24}>
            <Title level={5} color={theme.colors.white} align={'left'}>Document Mine</Title>
          </Col>
          <Col span={24}>
            <MenuSidebar/>
          </Col>

          <Col span={24}>
            <Divider style={{
              color: theme.colors.white,
              borderColor: theme.colors.white_2,
            }}>{pageTitle}</Divider>
          </Col>
          {!!documentName && <Col span={24}>
              <Paragraph style={{color: theme.colors.color_4}}>{documentName}</Paragraph>
          </Col>}
          {!!documentSummary && <Col span={24}>
              <Paragraph style={{color: theme.colors.color_3}}>{documentSummary}</Paragraph>
          </Col>}
          {!!conversations && <Col span={24}>
              <Row>
                  <Col span={24}>
                      <Divider style={{
                        color: theme.colors.white,
                        borderColor: theme.colors.white_2,
                      }}>Conversations</Divider>
                  </Col>
                {conversations.map((conversation) => {
                  return <Col key={conversation.conversation_id} span={24}>
                    <Paragraph
                      style={{color: theme.colors.color_4}}>{DateTime.fromMillis(conversation.create_time, {zone: 'utc'}).toFormat('yyyy/MM/dd HH:mm:ss')}</Paragraph>
                  </Col>
                })}
              </Row>

          </Col>}
        </Row>
      </Sider>
      <Layout>
        <Header style={{padding: 0}}>
          <Row>
            <Col span={12}>
              <Row gutter={5}>
                <Col flex={"0 0 30px"} style={{textAlign: "right"}}><MenuOutlined/>
                </Col>
                <Col flex={"1 1 0"}>
                  <Breadcrumb style={{height: 64, lineHeight: "64px"}}
                              items={breadcrumb}/>
                </Col>
              </Row>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <TopRightMenu>
                <li><Image src={'/user-avatar.png'} width={36}/></li>
                <li>{email}</li>
              </TopRightMenu>
            </Col>
          </Row>
        </Header>
        <ContentStyled>
          <Outlet/>
        </ContentStyled>
      </Layout>
    </MainLayoutStyled>
  )
}
const ContentStyled = styled(Content)`
  flex-grow: 1;
  padding: 20px 0;
  background-color: ${({theme}) => theme.colors.gray};
`

const TopRightMenu = styled.ul`
  list-style: none;
  flex-direction: row;
  display: flex;
  margin: 0;
  line-height: 40px;
  float: right;

  li {
    padding: 0 5px;

    img {
      border-radius: 50%;
    }
  }
`
const MainLayoutStyled = styled(Layout)`
  min-height: 100vh;
`
