import { Form } from "@unform/web";
import React, { useState, useCallback, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Header from "../../../components/header/header";
import { Container, FormSelect, GridBody, ContentButtons } from "./style";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import CSS from "csstype";
import Button from "../../../components/button";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import { api, classeCatechizing, getUsers } from "../../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { date } from "yup/lib/locale";
import { Co2Sharp, RestartAlt } from "@mui/icons-material";

interface Props {
  id: string;
  nome: string;
}

interface PropsId {
  id: string;
}

interface PropsClasses {
  dia_semana: string;
  hora: string;
  status: string;
  data_conclusao?: string;
}

interface PropsClassesUsers {
  login: string;
  senha: string;
  tipo: string;
  nome: string;
  id: string;
  data_cad: string;
}

const UpdateClasse: React.FC = (props: any) => {
  const [personName, setPersonName] = React.useState({ nomes: [], id: [] });
  const [personNameId, setPersonNameId] = React.useState();
  const [names, setNames] = useState<Props[]>([]);

  const createClasseSchema = yup.object().shape({
    dia_semana: yup.string(),
    hora: yup.string(),
    catequistas: yup.array(),
    status: yup.string(),
    data_conclusao: yup.string(),
  });

  useEffect(() => {
    listUsers();
  }, []);

  const listUsers = useCallback(async () => {
    const users = await getUsers();
    const usersCat = users.filter(
      (item: PropsClassesUsers) => item.tipo !== "COORDENADOR"
    );
    const totalUser = usersCat.map((item: Props) => ({
      id: item.id,
      nome: item.nome,
    }));
    setNames(totalUser);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsClasses>({ resolver: yupResolver(createClasseSchema) });
  let dataClasse: any = [];

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

  return (
    <>
      <Header title="Atualizar Turma" />
      <Container>
        <Form onSubmit={() => console.log("Ok")}>
          <GridBody>
            {/* <FormSelect>
              <Input name="text" type="text" placeholder="Nome da turma" />
            </FormSelect> */}
            <FormSelect>
              <div style={{ display: "flex", width: "100%" }}>
                <FormControl style={{ width: "100%", marginRight: "8px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Dia da semana
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    label="Dia da Semana"
                    placeholder="Dia da Semana"
                    {...register("dia_semana")}
                  >
                    <MenuItem value="DOMINGO">Domingo</MenuItem>
                    <MenuItem value="SEGUNDA">Segunda-Feira</MenuItem>
                    <MenuItem value="TERCA">Terça-Feira</MenuItem>
                    <MenuItem value="QUARTA">Quarta-Feira</MenuItem>
                    <MenuItem value="QUINTA">Quinta-Feira</MenuItem>
                    <MenuItem value="SEXTA">Sexta-Feira</MenuItem>
                    <MenuItem value="SABADO">Sabádo</MenuItem>
                  </Select>
                </FormControl>

                <FormControl style={{ width: "100%", marginLeft: "8px" }}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    type={"time"}
                    label="Horário"
                    {...register("hora")}
                  />
                </FormControl>
              </div>
            </FormSelect>
            <FormSelect>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Catequistas
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  //@ts-ignore
                  value={personName?.nomes}
                  //@ts-ignore
                  onChange={handleChange}
                  input={<OutlinedInput label="Catequistas" />}
                  //@ts-ignore
                  renderValue={(selected) => {
                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                >
                  {names.map((item) => (
                    //@ts-ignore
                    <MenuItem key={item.id} value={item.nome}>
                      <Checkbox
                        //@ts-ignore
                        checked={personName?.nomes.includes(item.nome)}
                        name={item.nome}
                      />
                      <ListItemText primary={item.nome} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormSelect>
            <FormSelect>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Status"
                  placeholder="Status"
                  {...register("status")}
                >
                  <MenuItem value="ATIVO">Ativo</MenuItem>
                  <MenuItem value="INATIVO">Inativo</MenuItem>
                </Select>
              </FormControl>
            </FormSelect>
            <ContentButtons>
              <Button type="submit" style={Cadastrar}>
                Cadastrar
              </Button>
              <Button
                style={Cancelar}
                onClick={(event) => props.navTo(event, 5)}
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

export default UpdateClasse;
