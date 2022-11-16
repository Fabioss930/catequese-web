import { TextField } from "@mui/material";
import { Form } from "@unform/web";
import React from "react";
import Header from "../../components/header/header";
import ModalConsulta from './modalConsulta'
import {
  Container,
  FormInput,
  GridBody,
  FormSelect,
  ContentButtons,
} from "./style";

import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

import CSS from "csstype";

import Button from "../../components/button";
import { relatorio } from "../../services/api";

const Filter: React.FC = () => {

  const [cat, setCat] = React.useState({
    sexo: "M",
    estado_civil: "S",
    data_nascimento_inicial: null,
    data_nascimento_final: null,
    data_cad_inicial: "",
    data_cad_final: "",
    todos_sac: "N"
  })

  const [idadeMin, setIdadeMin] = React.useState(null)
  const [idadeMax, setIdadeMax] = React.useState(null)
  const [result, setResult] = React.useState([])
  const [modal,setModal] = React.useState({openOrClose:false,data:[]})

  const changeIdadeMin = (event: any) => {
    setIdadeMin(event.target.value)
  }
  const changeIdadeMax = (event: any) => {
    setIdadeMax(event.target.value)
  }

  const inverterData = (dataOriginal: any) => {
    const arrayData = dataOriginal.split("-")
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`
  }

  // openOrClose closeModal

  const handleModal = ()=>{
    setModal({...modal, openOrClose: !modal.openOrClose})
  }

  const trocarNome  = (nome:any)=>{
    switch (nome) {
      case 'S':
        return 'Solteiro(a)'
        
        break;
      case 'C':
        return 'Casado(a)'
        
        break;
      case 'D':
        return 'Divorciado(a)'
        
        break;
      case 'V':
        return 'Viuvo(a)'
        
        break;
    }
  
  }

  function calcularIdade(ano_aniversario:any, mes_aniversario:any, dia_aniversario:any) {
    var d = new Date,
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),

      //@ts-ignore
      ano_aniversario = +ano_aniversario,
      //@ts-ignore
      mes_aniversario = +mes_aniversario,
      //@ts-ignore
      dia_aniversario = +dia_aniversario,

      quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  async function handleSubmit() {
    const date = new Date()

    
    
    const filter = {
      ...cat,
      data_cad_inicial: inverterData(cat.data_cad_inicial),
      data_cad_final: inverterData(cat.data_cad_final),
      data_nascimento_inicial: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() - (idadeMax||0)}`,
      data_nascimento_final: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() - (idadeMin||0)}`
    

    }
    //@ts-ignore
    if(idadeMax==null) delete filter.data_nascimento_inicial
    //@ts-ignore
    if(idadeMin==null) delete filter.data_nascimento_final
    //@ts-ignore
    if(cat.data_cad_inicial=="") delete filter.data_cad_inicial
    //@ts-ignore
    if(cat.data_cad_final=="") delete filter.data_cad_final
    console.log("Inicial:", filter)



    const catequizandos = await relatorio(filter)



    const catechizing = catequizandos?.map((cat:any)=>{
      const date = new Date(cat.data_nascimento).toLocaleDateString()
      const dateFormat = date.split('/')
    
      console.log("IDADE:", calcularIdade(dateFormat[2],dateFormat[1],dateFormat[0]))
      return{
        ...cat,
        data_nascimento: date,
        idade: calcularIdade(dateFormat[2],dateFormat[1],dateFormat[0]),
        estado_civil: trocarNome(cat.estado_civil)
       
      }

    })
    console.log("O que ta indo:",catechizing)
    setModal({openOrClose:true,data:catechizing})
    




  }

  const handle = (prop: any) => {
    const { target } = prop
    console.log(target)

    setCat({
      ...cat,
      [target.name]: target.value
    })

  }

  // console.log("IDADE MIN", idadeMin)
  // console.log("IDADE Max", idadeMax)
  console.log("CAT", cat)




  return (
    <>
      <ModalConsulta openOrClose={modal.openOrClose} closeModal={handleModal} data={modal.data}/>
      <Header title="Consulta detalhada" />
      <Container>
        <Form onSubmit={handleSubmit}>
          <GridBody>
            <div style={{ display: "flex", width: "100%" }}>
              <FormSelect style={{ width: '100%' }}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-label">
                    Estado Civil
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="Estado Civil"
                    placeholder="Estado Civil"
                    name="estado_civil"
                    onChange={handle}
                    value={cat.estado_civil}
                  >
                    <MenuItem value="S">Solteiro(a)</MenuItem>
                    <MenuItem value="C">Casado(a)</MenuItem>
                    <MenuItem value="V">Viuvo(a)</MenuItem>
                    <MenuItem value="D">Divorciado(a)</MenuItem>
                  </Select>
                </FormControl>
              </FormSelect>
              <FormInput style={{ width: "40%", marginLeft: 10, marginRight: 10 }}>
                <TextField
                  id="outlined-basic"
                  label="Idade Min"
                  sx={{ width: "100%" }}
                  type="number"
                  placeholder="Idade minima"
                  //@ts-ignore
                  name="idadeMin"
                  onChange={changeIdadeMin}
                  value={idadeMin}
                />
              </FormInput>
              <FormInput style={{ width: "40%" }}>
                <TextField
                  id="outlined-basic"
                  label="Idade Max"
                  sx={{ width: "100%" }}
                  type="number"
                  placeholder="Idade Max"
                  //@ts-ignore
                  name="idadeMax"
                  onChange={changeIdadeMax}
                  value={idadeMax}
                />
              </FormInput>
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >

            </div>
            <div style={{ display: 'flex', width: '100%' }}>

              <FormSelect style={{ width: '100%' }} >
                <FormControl style={{ width: '100%' }} >
                  <InputLabel id="demo-simple-select-label" >
                    Sexo
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="Sexo"
                    placeholder="Sexo"
                    name="sexo"
                    onChange={handle}
                    value={cat.sexo}

                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Feminino</MenuItem>
                  </Select>
                </FormControl>
              </FormSelect>
              <FormSelect style={{ width: '100%', marginLeft: 10, marginRight: 10 }}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-label">
                    Possui todos os sacramentos
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="Possui todos os sacramentos"
                    placeholder="Estado Civil"
                    name="todos_sac"
                    onChange={handle}
                    value={cat.todos_sac}
                  >
                    <MenuItem value="S">Sim</MenuItem>
                    <MenuItem value="N">Não</MenuItem>

                  </Select>
                </FormControl>
              </FormSelect>
              <FormSelect style={{ width: '100%' }}>
                <FormControl style={{ width: '100%' }}>
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
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ width: '100%' }}>

                <h5 style={{ marginBottom: 0 }}>Data de Cadastro Inicial</h5>
                <input className='inputData'
                  style={{
                    height: 50,
                    width: "99%",
                    borderRadius: 7,
                    padding: 15,
                    borderWidth: 1,
                    borderColor: '#b2b2b2',
                    marginTop: 10,
                    marginRight: 10,

                  }}
                  name="data_cad_inicial"
                  value={cat.data_cad_inicial}
                  onChange={handle}
                  
                  type='date'

                />
              </div>


              <div style={{ width: '100%' }}>
                <h5 style={{ marginBottom: 0 }}>Data de Cadastro Final</h5>
                <input className='inputData'
                  style={{
                    height: 50,
                    width: "99%",
                    borderRadius: 7,
                    padding: 15,
                    borderWidth: 1,
                    borderColor: '#b2b2b2',
                    marginTop: 10,
                    marginRight: 10,

                  }}
                  min={cat.data_cad_inicial}

                  name="data_cad_final"
                  value={cat.data_cad_final}
                  onChange={handle}
                  
                  type='date'

                />
              </div>
            </div>
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
