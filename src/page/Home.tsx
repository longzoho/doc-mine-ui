import React, {useContext, useEffect} from "react";
import {useGoogleAuth} from "../hook/UseGoogleAuth";
import {Row, Col} from "antd";
import DocumentUploader from "../component/DocumentUploader";
import DocumentList from "../component/DocumentList";
import {PageContext} from "../App";
import {useLocation} from 'react-router-dom';


export default function Home() {
  const location = useLocation();
  const pathname = location.pathname;
  const {email} = useGoogleAuth();
  const {setBreadcrumb, setConversations, setDocumentName, setDocumentSummary, setPageTitle} = useContext(PageContext);
  useEffect(() => {
    if (pathname.toLowerCase() === '/') {
      setBreadcrumb([{title: 'Home', href: '/'}]);
      setConversations(undefined);
      setDocumentName(undefined);
      setDocumentSummary(undefined);
      setPageTitle('Home')
    }
  }, [pathname, setBreadcrumb]);

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Row justify={'center'}>
          <Col span={12}>
            <DocumentUploader/>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <DocumentList/>
      </Col>
    </Row>)
}

