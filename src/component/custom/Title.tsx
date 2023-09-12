import React from 'react';
import {Typography} from 'antd';
import {TitleProps} from "antd/lib/typography/Title";
import styled from "styled-components";
import theme from "../../theme";

const {Title} = Typography;

interface Props extends TitleProps {
  align?: 'left' | 'center' | 'right' | undefined
}

const TitleStyled = styled(Title).attrs((props: Props) => ({
  style: {
    textAlign: props.align || 'center',
    ...props.color ? {color: props.color} : {},
  }
}))`
`;

const TitleComponent = (props: Props) => {
  return <TitleStyled {...props}/>
}
export default TitleComponent;