import {QuestionAnswer, SourceDocument, UserDocument} from "../../types";
import {Col, Collapse, Image, Row, Spin, Typography} from "antd";
import theme from "../../theme";
import styled from "styled-components";
import React, {useContext, useEffect, useRef} from "react";
import {DateTime} from "luxon";
import ConversationDocumentsContext from "./ConversationDocumentsContext";
import ReactMarkdown from "react-markdown";

const {Paragraph} = Typography;

interface QuestionAnswerItemProps {
  question_answer: QuestionAnswer;
}

const QuestionAnswerItem = (props: QuestionAnswerItemProps) => {
  const documents = useContext(ConversationDocumentsContext);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('documents', documents);
  }, [documents]);
  useEffect(() => {
    if (!ref?.current) return;
    ref?.current?.scrollIntoView({behavior: 'smooth'});
  }, [props.question_answer, ref]);
  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: 'smooth'});
  }, []);
  if (!props?.question_answer) return <></>;
  return <QuestionAnswerItemStyled ref={ref}>
    <Row justify={'center'} className={'question'}>
      <Col span={20}>
        <Row gutter={10}>
          <Col flex={'0 0 50px'} className={'question-avatar'}><Image src={'/user-avatar.png'} preview={false}
                                                                      width={50} height={50}/></Col>
          <Col flex={'1 1 auto'} className={'question-content'}><Paragraph>{props.question_answer.question}</Paragraph></Col>
        </Row>
      </Col>
    </Row>

    <Row justify={'center'} className={'answer'}>
      <Col span={20}>
        <Row gutter={10}>
          <Col flex={"0 0 50px"} className={'answer-avatar'}><Image src={"/bot-avatar.png"} preview={false} width={50}
                                                                    height={50}/></Col>
          <Col flex={"1 1 auto"} className={'answer-content'}>
            {!!props.question_answer.answer ?
              [<ReactMarkdownStyled>{props.question_answer.answer.result}</ReactMarkdownStyled>,
                <SourceDocumentsStyled
                  items={convertSourceDocumentsToCollapseItem(props.question_answer.answer.source_documents, documents)}>
                </SourceDocumentsStyled>]
              : DateTime.fromMillis(parseInt(props.question_answer.create_time.toString()), {zone: 'utc'}).diffNow("second").seconds > -300 ?
                <Paragraph>Please wait <Spin size="small"/></Paragraph> :
                <Paragraph>Error</Paragraph>}
          </Col>
        </Row>
      </Col>
    </Row>
  </QuestionAnswerItemStyled>
}
const convertSourceDocumentsToCollapseItem = (source_documents: SourceDocument[], documents: UserDocument[]) => {
  const mapUserDocument = {} as { [key: string]: UserDocument };
  documents.forEach((document) => {
    mapUserDocument[document.hash_name] = document;
  });
  if (!source_documents) return [];
  return source_documents.map((source_document, index) => {
    const hash_name = source_document.metadata.source?.split('/').pop()?.replace('.', '__');
    const document = hash_name ? mapUserDocument[hash_name] : undefined;
    return {
      key: index.toString(),
      label: <Row>
        <Col span={24}>
          <Row>
            <Col flex={"1 1 auto"}>
              <Paragraph
                color={theme.colors.color_5}>Reference in {document?.name || 'Unknown'}</Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>,
      children: <Row justify={'center'}>
        <Col span={24}><ReactMarkdown>{source_document.page_content}</ReactMarkdown></Col>
      </Row>
    }
  });
}

const QuestionAnswerItemStyled = styled.div`
  .question {
    .question-avatar {
    }

    .ant-typography {
      color: ${theme.colors.white_2};
      font-weight: bold;
    }

    background-color: ${theme.colors.gray_dark_3};
    width: 100%;
    margin: 0;
    padding: 10px;
  }

  .answer {
    .answer-avatar {
    }

    .answer-content {
      color: ${theme.colors.color_3};
    }

    background-color: ${theme.colors.gray};
    flex-grow: 1;
    margin: 0;
    padding: 10px;
  }
`
const SourceDocumentsStyled = styled(Collapse)`
  &.ant-collapse {
    border-radius: 0;

    .ant-collapse-header .ant-collapse-expand-icon {

    }

    .ant-collapse-content {
      padding: 5px 20px;
    }

    .ant-collapse-item:last-child {
      border-radius: 0;
    }
  }
`

const ReactMarkdownStyled = styled(ReactMarkdown)`
  pre code {
    text-wrap: initial;
  }
`
export default QuestionAnswerItem;