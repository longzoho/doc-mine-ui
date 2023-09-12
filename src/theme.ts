import {ThemeConfig} from "antd";

const gray = '#515665';
const light_grays = ['#626674', '#737783', '#858893', '#9699a2', '#a8aab2'];
const dark_grays = ['#484d5a', '#404450', '#383c46', '#30333c', '#282b32'];
const whites = ['#b9bbc1', '#caccd0', '#dcdde0', '#edeeef', '#ffffff']
const colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

const antTheme: ThemeConfig = {
  token: {
    fontFamily: "Oswald",
    fontSize: 14,
    fontWeightStrong: 700,
    colorText: colors[3],
  },

  components: {
    Checkbox: {
      colorBgContainer: dark_grays[2],
    },
    Pagination: {
      colorBgContainer: dark_grays[1],
      colorPrimary: colors[2],
      colorText: colors[3],
      colorTextDisabled: colors[4],
    },
    Collapse: {
      colorBgContainer: dark_grays[2],
    },
    Popover: {
      algorithm: true,
    },
    Button: {
      colorPrimaryBg: gray,
      colorText: colors[1],
      colorPrimary: colors[2],
      algorithm: true,
      colorBgBase: dark_grays[2],
    },
    Input: {
      colorBgContainer: light_grays[1],
      fontWeightStrong: 900,
      colorText: whites[3],
    },
    Table: {
      colorBgContainer: dark_grays[2],
      colorBgBase: dark_grays[4],
    },
    Modal: {
      contentBg: dark_grays[2],
      headerBg: dark_grays[2],
    },
    Upload: {
      colorText: colors[3],
      colorPrimary: colors[3],
      colorTextDescription: colors[4],
    },
    Breadcrumb: {
      itemColor: colors[3],
      linkColor: colors[3],
      separatorColor: colors[4],
      lineHeight: 1
    },
    Typography: {
      colorTextHeading: colors[4],
    },
    Layout: {
      colorBgHeader: dark_grays[3],
    }
  }
};
const styledTheme = {
  colors: {
    color_1: colors[0],
    color_2: colors[1],
    color_3: colors[2],
    color_4: colors[3],
    color_5: colors[4],
    white: whites[2],
    white_1: whites[0],
    white_2: whites[1],
    white_3: whites[2],
    white_4: whites[3],
    white_5: whites[4],
    black: '#222',
    sidebar: '#293143',
    contentBg: '#3e4555',
    gray: gray,
    gray_dark_1: dark_grays[0],
    gray_dark_2: dark_grays[1],
    gray_dark_3: dark_grays[2],
    gray_dark_4: dark_grays[3],
    gray_dark_5: dark_grays[4],
    gray_light_1: light_grays[0],
    gray_light_2: light_grays[1],
    gray_light_3: light_grays[2],
    gray_light_4: light_grays[3],
    gray_light_5: light_grays[4],
  }
}


export default {...antTheme, ...styledTheme};