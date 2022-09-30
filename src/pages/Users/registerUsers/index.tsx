import React, { useState } from "react";
import Header from "../../../components/header/header";
import { Container, GridBody, FormInput, ContentButtons } from "./style";
import { Form } from "@unform/web";
import Input from "../../../components/input";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "../../../components/button";
import CSS from "csstype";

const RegisterUsers: React.FC = (props: any) => {
  const [profile, setProfile] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setProfile(event.target.value as string);
  };

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

  const [gang, setGang] = React.useState<string[]>([]);

  const handleChange2 = (event: SelectChangeEvent<typeof gang>) => {
    const {
      target: { value },
    } = event;
    setGang(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function teste(event:any) {
    event.preventDefault()
    console.log(event)

  }

  return (
    <>
      <Header title="Cadastro de Usuário" />
      <Container>
        <Form onSubmit={() => teste}>
          <GridBody>
            <FormInput>
              <Input name="name" type="text" placeholder="Nome" />
            </FormInput>
            <FormInput>
              <Input name="email" type="email" placeholder="Email" />
            </FormInput>
            <FormInput>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Função</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={profile}
                  label="Função"
                  onChange={handleChange}
                  defaultValue={"Selecione"}
                >
                  <MenuItem value="Cat">Catequista</MenuItem>
                  <MenuItem value="Coord">Coordenador</MenuItem>
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
                  value={gang}
                  onChange={handleChange2}
                  input={<OutlinedInput label="Turma" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
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
                <Input name="senha" type="password" placeholder="Senha" />
              </FormInput>
              <FormInput style={{ width: "100%", marginLeft: "8px" }}>
                <Input
                  name="confirmeSenha"
                  type="password"
                  placeholder="Confirme a senha"
                />
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
