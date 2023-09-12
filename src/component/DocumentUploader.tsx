import styled from "styled-components";
import {Upload, message, Row, Col} from "antd";
import React from "react";
import {InboxOutlined} from "@ant-design/icons";
import {useGoogleAuth} from "../hook/UseGoogleAuth";
import Title from "./custom/Title";

const {Dragger} = Upload;

export default () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {accessToken} = useGoogleAuth();
  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <Title level={3}>Upload your document</Title>
        </Col>
        <Col span={24}>
          <DraggerStyled action={'/api/document/upload'} multiple={true}
                         accept={'application/pdf'}
                         headers={{'Authorization': accessToken!}}
                         showUploadList={false}
                         progress={{
                           strokeColor: {
                             '0%': '#108ee9',
                             '100%': '#87d068',
                           },
                           strokeWidth: 3,
                           format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
                         }}
                         onChange={(info) => {
                           console.log(info);
                           const {status} = info.file;
                           if (status !== 'uploading') {
                             console.log(info.file, info.fileList);
                           }
                           if (status === 'done') {
                             messageApi.success(`${info.file.name} file uploaded successfully.`);
                           } else if (status === 'error') {
                             messageApi.error(`${info.file.name} file upload failed.`);
                           }
                         }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
              files.
            </p>
            {contextHolder}
          </DraggerStyled>

        </Col>
      </Row>
    </>
  )
}

const DraggerStyled = styled(Dragger)`
  .ant-upload-drag-container.ant-upload-drag-container.ant-upload-drag-container {
    padding: 0 20px;
  }
`