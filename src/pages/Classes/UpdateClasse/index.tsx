import { Form } from "@unform/web";
import React, { useState, useCallback, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Header from "../../../components/header/header";
import {
  Container,
  FormSelect,
  GridBody,
  ContentButtons,
  ContainerLoading,
} from "./style";
import InputLabel from "@mui/material/InputLabel";
import { css, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";

import ListItemText from "@mui/material/ListItemText";
import CSS from "csstype";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../../components/button";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  api,
  classeCatechizing,
  deleteCatClasse,
  getClasseComplete,
  getOneClasse,
  getUsers,
  updateClasse,
} from "../../../services/api";
import ModalConfirme from "../../../components/modalConfirm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { date } from "yup/lib/locale";
import { Co2Sharp, RestartAlt } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import _, { filter } from "lodash";
import { wait } from "@testing-library/user-event/dist/utils";

interface Props {
  id: string;
  nome: string;
}

interface PropsId {
  id: string;
}

interface PropsClasses {
  id: string;
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

interface PropsCatechizing {
  turmaId: string;
  usuariosId: string;
}

const UpdateClasse: React.FC = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [usuariosId, setUsuariosId] = useState<Props[]>([]);
  const [cat, setCat] = useState<Props[]>([]);
  const [classeId, setClasseId] = useState(props.data);
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2018-01-01T00:00:00.000Z")
  );
  const [personName, setPersonName] = React.useState({ nomes: [], id: [] });
  const [personNameId, setPersonNameId] = React.useState<Props[]>([]);
  const [names, setNames] = useState<Props[]>([]);
  const [dia_semana, setDia_Semana] = useState("");
  const [hora, setHora] = useState("");
  const [status, setStatus] = useState("");
  const [modalConfirm, setModalConfirm] = useState({
    openOrClose: false, //openOrClose: atributo que indica se o modal esta berto ou fechado,
    id: null,
  });

  const handleClasseDate = useCallback(async (id: string) => {
    const classeDate = await getOneClasse(id);

    setDia_Semana(classeDate.dia_semana);
    setHora(classeDate.hora);
    setStatus(classeDate.status);
  }, []);

  const listUsers = useCallback(async () => {
    setLoading(true);
    const response = await getClasseComplete(classeId);
    const nameCat = response.catequistas;
    const totalCat = nameCat.map((item: Props) => ({
      id: item.id,
      nome: item.nome,
    }));
    setCat(totalCat);
    console.log("Cat:", cat);
    const users = await getUsers();

    const usersCat = users.filter(
      (item: PropsClassesUsers) => item.tipo !== "COORDENADOR"
    );

    const totalUser = usersCat.map((item: Props) => ({
      id: item.id,
      nome: item.nome,
    }));

    const filterNames = _.xorBy(totalUser, totalCat, "id");
    const nameUsers = filterNames.map((item: any) => ({
      id: item.id,
      nome: item.nome,
    }));
    setNames(nameUsers);
    setLoading(false);

    //@ts-ignore

    console.log("PersonName", filterNames);
  }, []);

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

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    //@ts-ignore
    const value: string[] = event.target.value;
    //@ts-ignore
    let vet = [];
    names.forEach((per, id) => {
      //compara de 'names' e 'value', se der meet ele adiciona o id correspodentes
      value.forEach((a) => {
        if (a == per.nome) {
          vet.push(per.id);
        }
      });
    });

    setPersonName({
      //@ts-ignore
      nomes: typeof value === "string" ? value.split(",") : value,
      //@ts-ignore
      id: typeof vet === "string" ? vet.split(",") : vet,
    });
  };

  useEffect(() => {
    handleClasseDate(classeId);
    listUsers();
  }, []);

  const handleChangeDay = (event: any) => {
    setDia_Semana(event.target.value);
  };

  const handleChangeTime = (event: any) => {
    setHora(event.target.value);
  };

  const handleChangeStatus = (event: any) => {
    setStatus(event.target.value);
  };

  const createClasseSchema = yup.object().shape({
    dia_semana: yup.string(),
    hora: yup.string(),
    catequistas: yup.array(),
    status: yup.string(),
    data_conclusao: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsClasses>({ resolver: yupResolver(createClasseSchema) });
  let dataClasse: any = [];

  const handleClasse = async () => {
    //Adicionar os catequistas na turma

    try {
      let data = {
        turmaId: classeId,
        usuariosId: personName.id,
      };

      console.log("Dados:", data);

      const response = await classeCatechizing(data);

      if (response.status === 202 || response.status === 200) {
        alert("Catequistas adicionado na turma com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async () => {
    //Submit do formulario

    const data = {
      dia_semana,
      hora,
      status,
    };

    try {
      const resTurma = await updateClasse(data, classeId);
      console.log("Update:", data);
      if (resTurma.status === 202 || resTurma.status === 200) {
        //@ts-ignore
        await handleClasse();

        alert("Turma alterada com sucesso!");

        // const idClasse = data.map((item: PropsId) => item.id);
        props.navTo("", 5);
      } else {
        alert("Erro ao alterar turma");
        console.log(resTurma.message);
      }
    } catch (error) {
      alert("Erro ao alterar turma");
    }
  };

  //@ts-ignore
  const removeCat = async (id) => {
    try {
      const data = {
        turmaId: classeId,
        usuarioId: id,
      };
      console.log("Dados:", data);

      const response = await deleteCatClasse(data);
      if (response.status === 200 || response.status === 202) {
        const newNames = cat.filter((item) => item.id !== id);
        //@ts-ignore
        setModalConfirm(!modalConfirm);
        //@ts-ignore
        setCat(newNames);
        listUsers();
      }
    } catch (error) {
      alert("Erro ao excluir catequista da turma");
    }
  };

  //@ts-ignore
  const handleModalConfirm = (id) => {
    setModalConfirm({
      openOrClose: !modalConfirm.openOrClose,
      id: id,
    });
  };

  return (
    <>
      <ModalConfirme
        data={modalConfirm}
        closeModal={handleModalConfirm}
        afterFunction={removeCat}
        title="Tem certeza que deseja excluir ? "
      />
      <Header title="Editar turma" />
      {loading ? (
        <ContainerLoading>
          <Box sx={{ marginTop: "20%" }}>
            <CircularProgress />
          </Box>
        </ContainerLoading>
      ) : (
        <>
          <Container>
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
                      onChange={handleChangeDay}
                      value={dia_semana}
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
                      onChange={handleChangeTime}
                      value={hora}
                    />
                  </FormControl>
                </div>
              </FormSelect>

              <FormSelect>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Adicionar catequistas
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    //@ts-ignore
                    value={personName?.nomes}
                    //@ts-ignore
                    onChange={handleChange}
                    input={<OutlinedInput label="Adicionar catequistas" />}
                    //@ts-ignore
                    renderValue={(selected) => {
                      //@ts-ignore
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
                    value={status}
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="ATIVO">Ativo</MenuItem>
                    <MenuItem value="INATIVO">Inativo</MenuItem>
                  </Select>
                </FormControl>
              </FormSelect>
              <InputLabel>Catequistas da turma</InputLabel>

              <FormControl>
                {cat.map((item) => (
                  //@ts-ignore
                  <MenuItem key={item.id} value={item.nome}>
                    <ListItemText
                      primary={item.nome}
                      style={{ color: "black" }}
                    />

                    <IconButton
                      onClick={() => handleModalConfirm(item.id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </MenuItem>
                ))}
              </FormControl>
              <ContentButtons>
                <Button
                  type="button"
                  onClick={handleSubmitForm}
                  style={Cadastrar}
                >
                  Salvar
                </Button>
                <Button
                  style={Cancelar}
                  onClick={(event) => props.navTo(event, 5)}
                >
                  Cancelar
                </Button>
              </ContentButtons>
            </GridBody>
          </Container>
        </>
      )}
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

const List: CSS.Properties = {
  borderWidth: "10px",
  borderColor: "rgba(0, 0, 0, 0.6)",
};

export default UpdateClasse;
