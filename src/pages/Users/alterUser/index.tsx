import React, { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import { Container, GridBody, FormInput, ContentButtons } from "./style";
import { Form } from "@unform/web";

import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, SelectChangeEvent, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "../../../components/button";
import CSS from "csstype";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createUsers, getOneUser } from '../../../services/api'



type CreateUserData = {
  nome: string;
  tipo: string;
  senha: string;
  login: string;
  turma: [];
  confirmSenha: string;
}

const createUserSchema = yup.object().shape({
  nome: yup.string(),
  tipo: yup.string(),
  senha: yup.string(),
  login: yup.string(),
  turma: yup.array(),
  confirmSenha: yup.string()
}
)

const AlterUsers: React.FC = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserData>({ resolver: yupResolver(createUserSchema) });
  const [gang, setGang] = React.useState<string[]>([]);

  const [user,setUser] = useState<CreateUserData>()

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(()=>{
      console.log(props.data)
      getUser(props.data)
  },[])

  const getUser = async (id:any)=>{
    const userCurrent = await getOneUser(id)
    console.log("User",userCurrent)
    setUser(userCurrent)


  }
  

  const handleSubmitForm: SubmitHandler<CreateUserData> = async (data) => {
    //Submit do formulario
    

    try {
      const res = await createUsers({...user,senha:data.senha});
      if (res.status === 202) {
        alert("Usuario cadastrado com sucesso!");
        props.navTo("", 1);
      } else {
        alert("Erro ao cadastrar usuario");
        console.log(res.message);
      }
    } catch (error) {
      alert("Erro ao Cadastrar Usuario");
    }
  };

  return (
    <>
      <Header title="Usuario > Alteração" />
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <GridBody>
            <FormInput>
              <TextField
                id="outlined-basic"
                
                sx={{ width: "100%" }}
                type="text"
                disabled
                placeholder="Nome"
                //@ts-ignore
                name="nome"
                value={user?.nome}
                {...register("nome")}
              />
            </FormInput>
            <FormInput>
              <TextField
                disabled
                id="outlined-basic"
                
                sx={{ width: "100%" }}
                //@ts-ignore
                name="login"
                type="text"
                placeholder="Nome"
                value={user?.login}
           
                {...register("login")}
              />
            </FormInput>
            <FormInput>
              <FormControl style={{ width: "100%" }}>
                <FormInput>
                  <TextField
                    disabled
                    id="outlined-basic"
                    
                    sx={{ width: "100%" }}
                  
                    //@ts-ignore
                    name="tipo"
                    type="text"
                    value={user?.tipo}
                    placeholder="Função"
                    {...register("tipo")}
                  />
                </FormInput>
              </FormControl>
            </FormInput>
           
         
            <div style={{ display: "flex", width: "100%" }}>
              <FormInput style={{ width: "100%", marginRight: "8px" }}>
                <TextField
                  id="outlined-basic"
                  label="Nova Senha"
                  sx={{ width: "100%" }}
                  type="password"
                  placeholder="Nova Senha"
                  //@ts-ignore
                  name="senha"
                  {...register("senha")}
                />
              </FormInput>
              <FormInput style={{ width: "100%", marginLeft: "8px" }}>
                <TextField
                  id="outlined-basic"
                  label="Confirme a nova senha"
                  sx={{ width: "100%" }}
                  type="password"
                  placeholder="Confirme a nova senha"
                  //@ts-ignore
                  name="confirmSenha"
                  
                  {...register("confirmSenha")}
                />
              </FormInput>
            </div>
            <ContentButtons>
              <Button type="submit" style={Cadastrar}>
                Salvar Alteração
              </Button>
              <Button
                style={Cancelar}
                onClick={(event) => props.navTo(event, 1)}
              >
                Cancelar
              </Button>
            </ContentButtons>
          </GridBody>
        </Form>
      </Container>
    </>
  );
};

const Cadastrar: CSS.Properties = {
  width: "150px",
  height: "50px",
  background: "#0aa699",
  marginRight: "10px",
};

const Cancelar: CSS.Properties = {
  width: "150px",
  height: "50px",
  background: "#e94847",
};

export default AlterUsers;