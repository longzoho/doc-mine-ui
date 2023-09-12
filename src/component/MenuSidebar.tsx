import React from 'react'
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import styled from "styled-components";
import theme from "../theme";
import {faFolderClosed} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MenuSidebar = () => {
  return <Row gutter={[5, 5]}>
    <Col span={24}><LinkStyled to={'/'}><HomeOutlined style={{fontSize: 20, color: '#fff'}}/>Home</LinkStyled></Col>
    <Col span={24}><LinkStyled to={'/profiles'}><FontAwesomeIcon icon={faFolderClosed}
                                                                 style={{color: theme.colors.white, fontSize: 20}}/>Profile</LinkStyled></Col>
  </Row>
}


const LinkStyled = styled(Link)`
  .anticon, .svg-inline--fa {
    margin-right: 5px;
  }

  color: ${theme.colors.white_2};
`
export default MenuSidebar;