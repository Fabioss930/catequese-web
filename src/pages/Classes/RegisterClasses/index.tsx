import { Form } from "@unform/web";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Header from "../../../components/header/header";
import Input from "../../../components/input";
import { FiLock, FiUser, FiUsers } from "react-icons/fi";
import { Container, FormSelect, GridBody, ContentButtons } from "./style";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CSS from "csstype";
import Button from "../../../components/button";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import TextField from "@mui/material/TextField";

const RegisterClasses: React.FC = (props: any) => {
  const [day, setDay] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2018-01-01T00:00:00.000Z")
  );

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };

  function teste() {
    console.log("Teste");
  }

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
    "Fabio Souza da Silva",
    "Kemer da Silva",
    "João Souza Gomes",
    "Larissa Bezerra",
    "Jubileu Jesus",
  ];

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange2 = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Header title="Cadastro de Turma" />
      <Container>
        <Form onSubmit={() => teste()}>
          <GridBody>
            <FormSelect>
              <Input name="text" type="text" placeholder="Nome da turma" />
            </FormSelect>
            <FormSelect>
              <div style={{ display: "flex", width: "100%" }}>
                <FormControl style={{ width: "100%", marginRight: "8px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Dia da semana
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={day}
                    label="Dia da Semana"
                    onChange={handleChange}
                    defaultValue={"Selecione"}
                  >
                    <MenuItem value="Domingo">Domingo</MenuItem>
                    <MenuItem value="Segunda-Feira">Segunda-Feira</MenuItem>
                    <MenuItem value="Terça-Feira">Terca-Feira</MenuItem>
                    <MenuItem value="Quarta-Feira">Quarta-Feira</MenuItem>
                    <MenuItem value="Quinta-Feira">Quinta-Feira</MenuItem>
                    <MenuItem value="Sexta-Feira">Sexta-Feira</MenuItem>
                    <MenuItem value="Sábado">Sabádo</MenuItem>
                  </Select>
                </FormControl>

                <FormControl style={{ width: "100%", marginLeft: "8px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopTimePicker
                      label="Horário"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
            </FormSelect>
            <FormSelect>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Alunos
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange2}
                  input={<OutlinedInput label="Alunos" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormSelect>
            <FormSelect>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={day}
                  label="Status"
                  onChange={handleChange}
                  defaultValue={"Selecione"}
                >
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
              </FormControl>
            </FormSelect>
            <ContentButtons>
              <Button style={Cadastrar}>Cadastrar</Button>
              <Button
                style={Cancelar}
                onClick={(event) => props.navTo(event, 3)}
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

export default RegisterClasses;
