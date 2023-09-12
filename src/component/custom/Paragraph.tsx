import React from 'react';
import {Typography} from 'antd';
import {ParagraphProps} from "antd/lib/typography/Paragraph";
import styled from "styled-components";

interface Props extends ParagraphProps {

}

const Paragraph = (props: Props) => {
  return <ParagraphStyled {...props}/>
}
const ParagraphStyled = styled(Typography.Paragraph)`
  color: ${props => props.color || 'black'};
`
export default Paragraph;