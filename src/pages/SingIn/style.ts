import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  img {
    margin-top: 30px;
  }
`;

export const Content = styled.div`
  border-radius: 20px;

  display: flex;
  justify-content: center;

  h1 {
    margin-top: 20px;
    color: #394362;
    font-size: 30px;
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    font-weight: bold;
    margin-bottom: 24px;
  }
  form {
    margin: 50px 0;
    width: 340px;
    text-align: center;
  }
`;
