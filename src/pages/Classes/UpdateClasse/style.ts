import { style } from "@mui/system";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
  margin: 50px 32px;
  height: 100%;
`;

export const GridBody = styled.div`
  padding: 26px;
  display: flex;
  flex-direction: column;
`;

export const FormSelect = styled.div`
  margin-bottom: 16px;
`;

export const ContentButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ContainerLoading = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
