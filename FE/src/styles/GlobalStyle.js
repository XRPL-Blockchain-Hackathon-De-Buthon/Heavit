import { createGlobalStyle } from "styled-components";
import theme from "@/styles/theme";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    background-color: #f4f4f4;
    color: ${theme.color.black};
  } 
  
  button,
  img,
  a {
    all: unset;
    cursor: pointer;
  }
`;

export default GlobalStyle;
