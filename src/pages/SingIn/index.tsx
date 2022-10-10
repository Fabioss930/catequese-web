import React,{useEffect} from "react";
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
    
  
    const loged = await login(event)
    if(loged){
      navigation('/')
    }else{
      alert('Usuario ou senha incorreta')
    }
    
   
  }

  useEffect(()=>{
    
    testee()
    
  },[])

  const testee = async ()=>{
    let testeServer
    testeServer = await fetch('http://localhost:3001').then(()=>true).catch(()=>false)
    !testeServer&&alert("Erro na comunicação com servidor")
    testeServer&&alert("Conxao estabelecida")


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
