import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { FiLock, FiMail } from "react-icons/fi";
import { Form } from "@unform/web";
import logoimg from "../../assets/logo-paroquia.png";

import { Container, Content } from "./style";

function teste() {}

const SignIn: React.FC = () => {
  return (
    <Container>
      <img src={logoimg} alt="logoParoquia" />
      <Content>
        <Form onSubmit={() => teste()}>
          <h1>Faça seu login</h1>
          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
