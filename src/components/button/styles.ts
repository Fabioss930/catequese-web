import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.button`
  background: #394362;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  color: #fff;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  font-weight: bold;

  &:hover {
    background: ${shade(0.2, "#1a3e72")};
  }
`;
