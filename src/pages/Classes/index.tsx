import React from "react";
import Button from "../../components/button";
import Header from "../../components/header/header";
import { Container, ContentButtons } from "./style";
import CSS from "csstype";

const Classes: React.FC = (props: any) => {
  return (
    <>
      <Header title="Turmas" />
      <ContentButtons>
        <Button style={Cadastrar} onClick={(event) => props.navTo(event, 6)}>
          Cadastrar
        </Button>

        <Button style={Remover}>Remover</Button>
      </ContentButtons>
      <Container></Container>
    </>
  );
};

const Cadastrar: CSS.Properties = {
  width: "150px",
  height: "50px",
  background: "#0aa699",
  marginRight: "10px",
};

const Remover: CSS.Properties = {
  width: "150px",
  height: "50px",
  background: "#e94847",
};

export default Classes;
