import { TextField } from "@mui/material";
import { Form } from "@unform/web";
import React from "react";
import Header from "../../components/header/header";
import {
  Container,
  FormInput,
  GridBody,
  FormSelect,
  ContentButtons,
} from "./style";
import { Dayjs } from "dayjs";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import CSS from "csstype";
import Stack from "@mui/material/Stack";
import Button from "../../components/button";

const Filter: React.FC = () => {
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(null);
  const [beginDate, setBeginDate] = React.useState<Dayjs | null>(null);
  function handleSubmit() {
    alert("DEuu");
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

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const names = ["Eucaristia", "Batismo", "Crisma", "Admissao"];

  return (
    <>
      <Header title="Consulta detalhada" />
      <Container>
        <Form onSubmit={handleSubmit}>
          <GridBody>
            <div style={{ display: "flex", width: "100%" }}>
              <FormInput style={{ width: "100%", marginRight: "8px" }}>
                <TextField
                  id="outlined-basic"
                  label="Nome do catequisando"
                  sx={{ width: "100%" }}
                  type="text"
                  placeholder="Nome do catequisando"
                  //@ts-ignore
                  name="nome"
                />
              </FormInput>
              <FormInput style={{ width: "40%" }}>
                <TextField
                  id="outlined-basic"
                  label="Idade"
                  sx={{ width: "100%" }}
                  type="number"
                  placeholder="Idade"
                  //@ts-ignore
                  name="idade"
                />
              </FormInput>
            </div>
            <FormSelect>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Sacramento
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  //@ts-ignore
                  value={personName}
                  //@ts-ignore
                  onChange={handleChange}
                  input={<OutlinedInput label="Sacramento" />}
                  //@ts-ignore
                  renderValue={(selected) => {
                    //@ts-ignore
                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    //@ts-ignore
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormSelect>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack sx={{ width: "100%", marginRight: "8px" }}>
                  <DatePicker
                    label="Data de cadastro"
                    value={valueDate}
                    onChange={(newValue) => {
                      setValueDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack sx={{ width: "100%" }}>
                  <DatePicker
                    label="Data de início do ciclo"
                    InputProps={{
                      sx: { "&.MuiFormControl-root": { width: "100%" } },
                    }}
                    value={beginDate}
                    onChange={(newValue) => {
                      setValueDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <FormInput style={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Duração atual do ciclo"
                sx={{ width: "100%" }}
                type="text"
                placeholder="Duração atual do ciclo"
                //@ts-ignore
                name="duracao"
              />
            </FormInput>
            <FormSelect>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">
                  Situação da catequese
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Situação da catequese"
                  placeholder="Situação da catequese"
                >
                  <MenuItem value="ATIVO">Ativo</MenuItem>
                  <MenuItem value="INATIVO">Inativo</MenuItem>
                </Select>
              </FormControl>
            </FormSelect>
            <ContentButtons>
              <Button type="submit" style={Buscar}>
                Buscar
              </Button>
            </ContentButtons>
          </GridBody>
        </Form>
      </Container>
    </>
  );
};

const Buscar: CSS.Properties = {
  width: "150px",
  height: "50px",
  background: "#0aa699",
  marginRight: "10px",
};

export default Filter;
