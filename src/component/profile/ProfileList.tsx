import React, {useEffect, useState} from 'react';
import {useFirebase} from "../../hook/UseFirebase";
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ref, onValue} from "@firebase/database";
import {UserProfile} from "../../types";
import {Button, Col, Row, Table} from "antd";
import Title from "../custom/Title";
import styled from "styled-components";
import {ColumnsType} from "antd/es/table";
import {DateTime} from "luxon";

const ProfileList = () => {
  const {db} = useFirebase();
  const {userId} = useGoogleAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<UserProfile[]>();

  useEffect(() => {
    if (!db || !userId) return;
    const refProfiles = ref(db, `users/${userId}/profiles`);
    const unsubscribe = onValue(refProfiles, (snapshot) => {
      const data = snapshot.val() || {};
      let datasource = Object.keys(data).map((key) => {
        return {...data[key], key: key, profile_id: key};
      }).sort((a, b) => a.create_time - b.create_time);
      setProfiles(datasource);
    });
    return () => unsubscribe();
  }, [db, setProfiles, userId]);
  return <Row style={{marginLeft: 20, marginRight: 20}}>
    <Col span={24}>
      <Title level={4} align={'left'}>Your documents</Title>
    </Col>
    <Col span={24}>
      <TableStyled dataSource={profiles} columns={createTableColumns(navigate)}/>
    </Col>
  </Row>
}

const createTableColumns = (navigate: NavigateFunction): ColumnsType<any> => [
  {
    title: 'Name', dataIndex: 'name', key: 'name',
  }, {
    title: 'description', dataIndex: 'description', key: 'description', width: 'auto'
  }, {
    title: 'created', dataIndex: 'create_time', key: 'create_time', render: (value: number) => {
      const dateValue = DateTime.fromMillis(value * 1000, {zone: 'utc'});
      return <span>{dateValue.toFormat('yyyy/MM/dd HH:mm:ss')}</span>
    }
  }, {
    title: 'status', dataIndex: 'status', key: 'status'
  }, {
    title: 'action', key: 'action', render: (value: any, record: UserProfile) => {
      return <Row gutter={[5, 5]}>
        <Col>
          <Button type={'default'} onClick={() => navigate(`/profile/${record.profile_id}`)}>Ask profile</Button>
        </Col>
      </Row>
    }
  }
];

const TableStyled = styled(Table)`
  &.ant-table-wrapper {
    width: 100%;
  }
`
export default ProfileList;