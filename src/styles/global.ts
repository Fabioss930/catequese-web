import { createGlobalStyle } from "styled-components";


// Laranja: #ff9000
//background:  #1a2845
//Shadow: rgb(26 17 31)

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    background:  #f7f7f7;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
   }
   body, input, button {
     
     font-size: 16px;
     font-family: "Montserrat", Arial, Helvetica, sans-serif;
   }
   h1, h2, h3, h4, h5, h6, strong {
     font-weight: 500;
   }
   button {
     cursor: pointer;
   }
`;
