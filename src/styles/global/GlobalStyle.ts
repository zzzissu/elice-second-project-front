import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: "Noto Sans KR", sans-serif;
    }

    .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
    background-color: #f5f5f5;
  }
`;

export default GlobalStyle;
