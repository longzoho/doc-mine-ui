import React from 'react'
import {Layout as AntLayout, LayoutProps as AntLayoutProps} from 'antd';
import styled from "styled-components";
import theme from "../theme";

const {Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider} = AntLayout;


export interface BackgroundColorProps {
  bgcolor?: string,
}

export interface FlexGrowProps {
  flexGrow?: number,
}

const Layout = styled(AntLayout)<FlexGrowProps>`
  ${props => props.flexGrow && `flex-grow: ${props.flexGrow};`}
`
const Header = styled(AntHeader)<BackgroundColorProps>`
  ${props => props.bgcolor ? `background-color: ${props.bgcolor}` : ``}
`
const Content = styled(AntContent)<BackgroundColorProps & FlexGrowProps>`
  ${props => props.bgcolor ? `background-color: ${props.bgcolor}` : ``}
`

const Footer = styled(AntFooter)<BackgroundColorProps>`
  ${props => props.bgcolor ? `background-color: ${props.bgcolor}` : ``}
`
const Sider = styled(AntSider)<BackgroundColorProps>`
  &.ant-layout-sider {
    background-color: ${props => props.bgcolor ? props.bgcolor : theme.colors.white};
  }
`
export default Layout;
export {Header, Content, Footer, Sider};