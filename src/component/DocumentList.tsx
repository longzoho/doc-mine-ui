import React, {useEffect, useState} from "react";
import {onValue, ref, child} from "@firebase/database";
import {useFirebase} from "../hook/UseFirebase";
import {useGoogleAuth} from "../hook/UseGoogleAuth";
import {Button, Col, Modal, Popover, Row, Table} from "antd";
import styled from "styled-components";
import {ColumnsType} from "antd/es/table";
import Title from "./custom/Title";
import {DateTime} from "luxon";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {UserDocument} from "../types";
import CreateProfileModall from "./profile/CreateProfileModall";
import ReactMarkdown from "react-markdown";


export default () => {
  const [documents, setDocuments] = useState<UserDocument[]>()
  const {db} = useFirebase();
  const {userId} = useGoogleAuth();
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState<UserDocument[]>();
  const [isModalOpenNewProfile, setIsModalOpenNewProfile] = useState(false);
  const [isOpemModalSummary, setIsOpemModalSummary] = useState(false);
  const [summary, setSummary] = useState<string>();

  useEffect(() => {
    if (!db || !userId) return;
    const refUser = ref(db, `users/${userId}`);
    const refDocument = child(refUser, `documents`);
    const unsubscribe = onValue(refDocument, (snapshot) => {
      const data = snapshot.val() || {};

      /*
      set key as key of object
       */
      let datasource = Object.keys(data).map((key) => {
        return {...data[key], key: key, hash_name: key};
      }).sort((a, b) => a.create_time - b.create_time);
      setDocuments(datasource);
    });
    return () => unsubscribe();
  }, [userId, db]);
  useEffect(() => {
  }, [documents]);

  const tableColumns: ColumnsType<any> = [
    {
      title: 'Name', dataIndex: 'name', key: 'name',
    }, {
      title: 'summary',
      dataIndex: 'summary',
      key: 'summary',
      width: 'auto',
      render: value => <div style={{maxHeight: 100, overflowY: "auto"}} onClick={() => {
        setSummary(value);
        setIsOpemModalSummary(true);
      }}>
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    }, {
      title: 'status', dataIndex: 'status', key: 'status'
    }, {
      title: 'created', dataIndex: 'create_time', key: 'create_time', render: (value: number) => {
        const dateValue = DateTime.fromMillis(value * 1000, {zone: 'utc'});
        return <span>{dateValue.toFormat('yyyy/MM/dd HH:mm:ss')}</span>
      }
    }, {
      title: 'action', key: 'action', render: (value: any, record: UserDocument) => {
        return <Row gutter={[5, 5]}>
          <Col>
            <Popover
              title="Comming soon"
              content="This feature is comming soon"
              trigger={'click'}
            >
              <Button type={'dashed'}>Download</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              title="Comming soon"
              content="This feature is comming soon"
              trigger={'click'}
            >
              <Button type={'dashed'}>Re summary</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              title="Comming soon"
              content="This feature is comming soon"
              trigger={'click'}>
              <Button disabled={value.status !== 'EMBED_SAVED'}
                      type={'default'} onClick={() => navigate(`/document/${record.hash_name}`)}>Ask document</Button>
            </Popover>
          </Col>
        </Row>
      }
    }
  ];

  return (
    <Row style={{marginLeft: 20, marginRight: 20}}>
      <Col span={24}>
        <Title level={4} align={'left'}>Your documents</Title>
      </Col>
      <Col span={24}>
        <TableStyled dataSource={documents}
                     rowSelection={{
                       type: 'checkbox',
                       onChange: (selectedRowKeys, selectedRows) => {
                         setSelectedRow(selectedRows.map((row) => {
                           return row as UserDocument
                         }));
                       }
                     }}
                     columns={tableColumns}/>
      </Col>
      <Col span={24}>
        <Button disabled={!selectedRow?.length} onClick={() => setIsModalOpenNewProfile(true)}>Create new
          profile</Button>
      </Col>
      <CreateProfileModall setIsModalOpen={setIsModalOpenNewProfile} open={isModalOpenNewProfile}
                           selectedRow={selectedRow}/>
      <SummaryModalStyled open={isOpemModalSummary} onCancel={() => setIsOpemModalSummary(false)} footer={null} width={700} centered>
        <div style={{overflowWrap: 'break-word'}}><ReactMarkdown>{summary || ""}</ReactMarkdown></div>
      </SummaryModalStyled>
    </Row>
  );
}

const TableStyled = styled(Table)`
  &.ant-table-wrapper {
    width: 100%;
  }
`

const SummaryModalStyled = styled(Modal)`
  .ant-modal-body {
    pre code {
      text-wrap: initial;
    }
  }
`