import React, { useState } from "react";
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
import {createUsers} from '../../../services/api'



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




const RegisterUsers: React.FC = (props: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserData>({ resolver: yupResolver(createUserSchema) })
  const [gang, setGang] = React.useState<string[]>([]); 

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
  

  const names = [
    "Turma 1",
    "Turma 2",
    "Turma 3",
    "Turma 4",
    "Turma 5,",
    "Turma 6",
    "Turma 7",
    "Turma 8",
    "Turma 9",
  ];

  const handleChange = (event: SelectChangeEvent<typeof gang>) => { //Lida com a mudanças do select de turmas
    const {
      target: { value },
    } = event;
    setGang(
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  const handleSubmitForm: SubmitHandler<CreateUserData> = async (data) => {  //Submit do formulario

    try {
      const res = await createUsers(data)
      if(res.status===202){
        alert('Usuario cadastrado com sucesso!')
        props.navTo('',1)

      }else{
        alert('Erro ao cadastrar usuario')
        console.log(res.message)
      }

      
    } catch (error) {
      alert('Erro ao Cadastrar Usuario')
      
    }
    
    
  }



  return (
    <>
      <Header title="Cadastro de Usuário" />
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <GridBody>
            <FormInput>
              <TextField
                id="outlined-basic"
                label="Nome"
                sx={{ width: '100%' }}
                type="text"
                placeholder="Nome"
                //@ts-ignore 
                name="nome"

                {...register("nome")} />
            </FormInput>
            <FormInput>
              <TextField
                id="outlined-basic"
                label="Email"
                sx={{ width: '100%' }}
                //@ts-ignore
                name="login"
                type="email" placeholder="Email"  {...register('login')} />
            </FormInput>
            <FormInput>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Função</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Função"
                  //@ts-ignore                  
                  placeholder="Função"
                  {...register('tipo')}
                >

                  <MenuItem value="CAT">Catequista</MenuItem>
                  <MenuItem value="COORD">Coordenador</MenuItem>
                </Select>
              </FormControl>
            </FormInput>
            <FormInput>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Turma</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  input={<OutlinedInput label="Turma" />}
                  //@ts-ignore
                  renderValue={(selected) => selected.join(", ")}
                  //@ts-ignore
                  name="turma"
                  {...register('turma')}
                  MenuProps={MenuProps}
                  value={gang}
                  onChange={handleChange}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={gang.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormInput>
            <div style={{ display: "flex", width: "100%" }}>
              <FormInput style={{ width: "100%", marginRight: "8px" }}>
                <TextField
                  id="outlined-basic"
                  label="Senha"
                  sx={{ width: '100%' }}
                  type="password"
                  placeholder="Senha"
                  //@ts-ignore
                  name="senha"
                  {...register('senha')} />
              </FormInput>
              <FormInput style={{ width: "100%", marginLeft: "8px" }}>
                <TextField
                  id="outlined-basic"
                  label="Senha"
                  sx={{ width: '100%' }}
                  type="password"
                  placeholder="Confirme a senha"
                  //@ts-ignore
                  name="confirmSenha"
                  {...register('confirmSenha')} />

              </FormInput>
            </div>
            <ContentButtons>
              <Button type="submit" style={Cadastrar}>
                Salvar
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

export default RegisterUsers;
