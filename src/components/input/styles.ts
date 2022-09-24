import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 1px solid #b2b2b2;
  padding: 16px;
  width: 100%;
  margin-top: 8px;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #1a3e72;
      border-color: #1a3e72;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #1a3e72;
    `}

input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
