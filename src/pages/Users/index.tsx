import React from "react";
import Button from "../../components/button";
import Header from "../../components/header/header";
import { Container, ContentButtons } from "./style";
import CSS from "csstype";

const Users: React.FC = (props: any) => {
  return (
    <>
      <Header title="Usuários" />
      <ContentButtons>
        <Button style={Cadastrar} onClick={(event) => props.navTo(event, 2)}>
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

export default Users;
