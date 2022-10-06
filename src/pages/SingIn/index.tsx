import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import logoimg from "../../assets/logo-paroquia.png";
import { useNavigate } from "react-router-dom";

import { Container, Content } from "./style";
import { login } from "../../services/api";

const SignIn: React.FC = () => {
  const navigation = useNavigate();

 const teste = async (event:any)=> {
    
  
    const data = await login(event)
    console.log("O que veio ",data)
    if(data) {
      localStorage.setItem('loged',JSON.stringify({loged:data?true:false})) 
      localStorage.setItem('idUser',data.tokenCatequese.id)
      navigation('/')
    }else{
      alert('Usuario ou senha incorretos')
    }
   
  }


  

  return (
    <Container>
      <img src={logoimg} alt="logoParoquia" />
      <Content>
        <Form onSubmit={(event) => teste(event)}>
          <h1>Faça seu login</h1>
          <Input icon={FiUser} name="login" type="text" placeholder="Usuário" />
          <Input
            icon={FiLock}
            name="senha"
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
