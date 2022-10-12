//import { createCatechizing, getClasses, getDocumentsCatechizing, getOneCatechizing, getOneUser} from '../../../services/api';

// const getTurmas =  async()=>{
//   const turmasApi = await getClasses()
  
//   setTurmas([...turmasApi])
// }

// const getUser = async (id)=>{

// const user = await getOneCatechizing(id)
// const date = new Date(user.data_nascimento)
//   console.log(user)
//   setNome(user.nome)
//   setEstado_civil(user.estado_civil)
//   setData_nascimento(date)
//   const years = calcularIdade(date.getFullYear(), date.getMonth(), date.getDate())
//   console.log("Idade",years)
//   setIdade(years)
  
//   setStatus('A')


// }

import Header from '../../../components/header/header';
import ArrowBack from '@mui/icons-material/ArrowBack'
import Alert from '@mui/icons-material/CrisisAlert'
import { Form } from '@unform/web';
import { Select, MenuItem, Radio, RadioGroup, Grow, FormControl, FormLabel, FormControlLabel, TextField, InputLabel, Stack, OutlinedInput, Checkbox, ListItemText } from '@mui/material'
import Input from '../../../components/input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '../../../components/button';
import { useEffect, useState } from 'react'
import './Alter.css'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { getClasses,getOneCatechizing, insertCatechizingInTurma, insertDocumentsCatechizing,getDocumentsCatechizing, insertScraments } from '../../../services/api';
import { IMaskInput } from 'react-imask';
import { Container } from '@mui/system';
import { getTrailingCommentRanges } from 'typescript';
//import { createCatechizing, getClasses, , getOneCatechizing, getOneUser} from '../../../services/api';


function Users(props) {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState("")
  const [sacramentos_concluidos, setSacramentosConcluidos] = useState([])
  const [sacramentosAPerformar, setSacramentosAPerformar] = useState([])
  const [sacramentos, setSacrametos] = useState([{

    tipo_sacramento: "",
    data_inicio: "",
    data_fechamento: ""

  }])
  const [turmas, setTurmas] = useState([{}])
  const [turmaSelecionada, setTurmaSelecionada] = useState({})
  const [genero, setGenero] = useState("")
  const [data_nascimento, setData_nascimento] = useState(0)
  const [estado_civil, setEstado_civil] = useState("")
  const [vive_maritalmente, setVive_maritalmente] = useState("")
  const [padrinho_madrinha, setPadrinho_madrinha] = useState("")
  const [status, setStatus] = useState("")
  const [documentos, setDocumentos] = useState({
    cpf: "N",
    rg: "N",
    comprovante_residencia: "N", //Comprovante de Residencia
    casamento_igreja: "N" //Comprovante de Casamento
  })
  const [documentosSacramentos, setDocumentosSacramentos] = useState({
    comprovante_admissao: "N",
    comprovante_batismo: "N",
    comprovante_crisma: "N",
    comprovante_eucaristia: "N"

  })

  const onSubmitForm = async () => {

    const todos_sac = sacramentos_concluidos.length == 4 ? "S" : "N"

    const catechizing = {
      nome,
      todos_sac,
      data_nascimento,
      estado_civil,
      padrinho: padrinho_madrinha != null ? 'S' : 'N',
      madrinha: padrinho_madrinha != null ? 'S' : 'N',

    }
    const documents = {
      vive_maritalmente,
      cpf: documentos.cpf,
      rg: documentos.rg,
      admissao: sacramentos_concluidos.includes('Admissao') ? "S" : "N",
      comprovante_residencia: documentos.comprovante_residencia,
      casamento_igreja: documentos.casamento_igreja && estado_civil === 'C' ? "S" : "N",
      casamento_civil: estado_civil === 'C' ? "S" : "N"

    }
    const sacAPerformar = sacramentosAPerformar.map(s=>{
      return{
      tipo_sacramento:s[0],
      data_inicio: new Date().toLocaleDateString()
    }
    })

    const sacramentosOficial = sacramentos.concat(sacAPerformar)
    
    
    console.log(sacramentosOficial)
    console.log("DATA CERTA:" , data_nascimento)
    insertScraments(sacramentosOficial,2)
    
    // try {
    //   const res = await createCatechizing(catechizing)

    //   if (res.status === 202) {
    //     alert("Usuario cadastrado com sucesso!");
    //     const resDocuments = await insertDocumentsCatechizing(documents, res.id)
    //     if (resDocuments.status == 202) {
    //       alert('Documentos cadastrados com sucesso!')
    //       const resTurma = await insertCatechizingInTurma({ idCat: res.id, idTurma: turmaSelecionada })
    //       if (resTurma.status == 202) {
    //         alert('Catequizando cadastrado em uma turma!')
            
    //         props.navTo("", 3)
    //       } else {
    //         console.log(resTurma.message)
    //       }
    //     }

    //   } else {
    //     alert("Erro ao cadastrar usuario");
    //     console.log(res.message);
    //   }
    // } catch (error) {
    //   alert("Erro ao acessar api");
    // }

  }


  useEffect(() => {
    getUser(props.data)
    getDocuments(props.data)
    getTurmas()
    
  }, [])


  useEffect(() => {

    setSacramentosAPerformar([])



  }, [sacramentos_concluidos])

const getDocuments = async (id)=>{    //Pega os documentos do usuario
  const doc = await getDocumentsCatechizing(id)
    
  setDocumentos(doc)
  console.log(doc)
  
}
const getUser = async (id)=>{

const user = await getOneCatechizing(id)
const date = new Date(user.data_nascimento)
  console.log(user)
  setNome(user.nome)
  setEstado_civil(user.estado_civil)
  setData_nascimento(date)
  const years = calcularIdade(date.getFullYear(), date.getMonth(), date.getDate())
  console.log("Idade",years)
  setIdade(years)
  
  setStatus('A')


}

  const getTurmas = async () => {
    const turmasApi = await getClasses()
    setTurmas([...turmasApi])
  }

  const MenuProps = { //Pertence as configurações de estilo do select turma
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const onChangeNome = (event) => {
    setNome(event.target.value)

  }


  const onChangeGenero = (event) => {
    setGenero(event.target.value)

  }
  const onChangeDataNasc = (event) => {

    if (event) {
      const years = calcularIdade(event.$y, event.$M, event.$D)
      setIdade(years)
      setData_nascimento(event.$d.toLocaleDateString())
    }
  }

  const onChangeEstadoCivil = (event) => {
    setEstado_civil(event.target.value)

  }
  const onChangeCasadoCivil = (event) => {
    setVive_maritalmente(event.target.value)

  }
  const onChangeDocumentos = (event) => {

    setDocumentos({
      ...documentos,
      [event.target.name]: event.target.value
    })
  }

  const onChangeTurma = (event) => {
    setTurmaSelecionada(event.target.value)

  }
  const onChangeDocumentosSacramentos = (event) => {

    setDocumentosSacramentos({
      ...documentosSacramentos,
      [event.target.name]: event.target.value
    })
  }


  const onChangeSacramentosConcluidos = (event) => { //usado pelo select de sacramentosAPerformar concluidos

    const { target: { value } } = event;


    setSacramentosConcluidos(
      typeof value === 'string' ? value.split(',') : value,
    );

    let sacProv = []
    value.forEach(sac => {
      sacProv.push({
        tipo_sacramento: sac[0]
      })

    });

    setSacrametos(sacProv)
  }
  console.log(sacramentosAPerformar)

  const onChangeSacramentosAperformar = (event) => { //usado pelo select de sacramentosAPerformar concluidos

    const { target: { value } } = event;
    

    setSacramentosAPerformar(
      typeof value === 'string' ? value.split(',') : value,
    );
    

      
    
  }

  const onChangeDataSacramentoInicio = (event) =>{
    const { target: { value } } = event;
    const { target: { name } } = event;

    console.log("Formatado?",new Date(value).toLocaleDateString())

    const sacIndex = sacramentos.map(a=>{
      if(a.tipo_sacramento==name){
        a.data_inicio=new Date(value).toLocaleDateString()
        return a
      }else{

        return a
      }
    })

    console.log(sacIndex)

  }
  const onChangeDataSacramentoFechamento = (event) =>{
    const { target: { value } } = event;
    const { target: { name } } = event;

    
    
    const sacIndex = sacramentos.map(a=>{
      if(a.tipo_sacramento==name){
        a.data_fechamento=new Date(value).toLocaleDateString()
        return a
      }else{

        return a
      }
    })

    console.log(sacIndex)

  }




  function calcularIdade(ano_aniversario, mes_aniversario, dia_aniversario) {
    var d = new Date,
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),

      ano_aniversario = +ano_aniversario,
      mes_aniversario = +mes_aniversario,
      dia_aniversario = +dia_aniversario,

      quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  const todosSacramentos = [
    "Eucaristia",
    "Batismo",
    "Crisma",
    "Admissao"

  ];


  const renderSacramentosAPerformar = () => {

    const sacramentosRestantes = todosSacramentos.filter(i => !sacramentos_concluidos.includes(i));

    return (

      sacramentosRestantes.map((name) => {

        return (
          <MenuItem key={name} value={name}>
            <Checkbox checked={sacramentosAPerformar.indexOf(name) > -1} />
            <ListItemText primary={name} />

          </MenuItem>
        )
      })
    )
  }


  return (
    <div className="container">
      <Header title="Catequizandos > Alteração" />
      <div style={{ padding: 20 }}>
        <ArrowBack
          onClick={(event) => props.navTo(event, 3)}
          sx={{ ":hover": { color: "#ff9000" }, color: "#394362" }}
        />
        <div className="container-register">
          <Form
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              id="outlined-basic"
              label="Nome"
              name="text"
              value={nome}
              onChange={onChangeNome}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />

            <div className="container-duble">
              <FormControl variant="outlined" sx={{ width: "33%" }}>
                <InputLabel id="demo-select-small">Genero</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={onChangeGenero}
                  label="Genero"
                  value={genero}
                  sx={{ height: 50 }}
                >
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "33%" }}>
                <InputLabel id="demo-select-small">Estado Civil</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={onChangeEstadoCivil}
                  label="Dia da Semana"
                  value={estado_civil}
                  name="estado_civil"
                  sx={{ height: 50 }}
                >
                  <MenuItem value={"C"}>Casado(a)</MenuItem>
                  <MenuItem value={"S"}>Solteiro(a)</MenuItem>
                  <MenuItem value={"V"}>Viúvo(a)</MenuItem>
                  <MenuItem value={"D"}>Divorciado(a)</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "33%" }}>
                <InputLabel id="demo-select-small">
                  Casado Civil ou Mora Junto
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={onChangeCasadoCivil}
                  label="Casado Civil ou Mora Junto"
                  value={vive_maritalmente}
                  name="casado"
                  sx={{ height: 50 }}
                >
                  <MenuItem value={"S"}>Sim</MenuItem>
                  <MenuItem value={"N"}>Não</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div></div>

            <div className="container-duble">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack sx={{ width: "80%" }} spacing={3}>
                  <DesktopDatePicker
                    label="Data de nascimento"
                    inputFormat="DD/MM/YYYY"
                    value={data_nascimento}
                    onChange={onChangeDataNasc}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          height: "100%",
                          borderRadius: 10,
                          padding: 0,
                          marginTop: 1,
                          marginRight: 1,
                        }}
                        {...params}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
              <FormControl sx={{ width: "49%" }}>
                <Input
                  name="idade"
                  placeholder="Idade"
                  type="text"
                  style={{ fontSize: 15 }}
                  disabled
                  value={idade + " Anos"}
                />
              </FormControl>
            </div>
            <div
              className="container-duble"
              style={{ marginBottom: 10, marginTop: 10 }}
            >
              <FormControl sx={{ width: "49%", justifyContent: "center" }}>
                <IMaskInput
                  name="number"
                  style={{
                    marginBottom: -10,
                    height: 50,
                    padding: 10,
                    border: "1px solid #b2b2b2",
                    borderRadius: 5,
                  }}
                  className="form-control"
                  placeholder="Numero 1"
                  mask="(00) 0 0000-0000"
                />
              </FormControl>
              <FormControl sx={{ width: "49%" }}>
                <IMaskInput
                  name="number"
                  style={{
                    marginBottom: -10,
                    height: 50,
                    padding: 10,
                    border: "1px solid #b2b2b2",
                    borderRadius: 5,
                  }}
                  className="form-control"
                  placeholder="Numero 2"
                  mask="(00) 0 0000-0000"
                />
              </FormControl>
            </div>

            <FormControl style={{ width: "100%", marginTop: 10 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Sacramentos que possui
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                input={<OutlinedInput label="Sacramentos que Possui" />}
                //@ts-ignore
                renderValue={(selected) => selected.join(", ")}
                //@ts-ignore
                name="sacramentos_concluidos"
                MenuProps={MenuProps}
                value={sacramentos_concluidos}
                onChange={onChangeSacramentosConcluidos}
              >
                {todosSacramentos.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={sacramentos_concluidos.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {sacramentos_concluidos.includes("Crisma") ||
              (sacramentos_concluidos.includes("Batismo") && (
                <Grow
                  in={
                    sacramentos_concluidos.includes("Crisma") ||
                    sacramentos_concluidos.includes("Batismo")
                  }
                  style={{ marginTop: 10 }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Padrinho/Madrinha *"
                    name="text"
                    value={padrinho_madrinha}
                    onChange={(event) =>
                      setPadrinho_madrinha(event.target.value)
                    }
                    variant="outlined"
                  />
                </Grow>
              ))}


            <div style={{ marginTop: 5 }}>
              <h3 className="title"> Documentações</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <FormControl
                className="formControlContainer"
                sx={{ marginTop: 2, marginBottom: 2 }}
              >
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ color: "#394362" }}
                >
                  Apresentou RG ?
                </FormLabel>
                <RadioGroup
                  onChange={onChangeDocumentos}
                  style={{ display: "block" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={documentos.rg}
                  defaultValue={"Nao Entregue"}
                  name="rg"
                >
                  <FormControlLabel
                    value="S"
                    control={<Radio />}
                    label="Sim"
                    sx={
                      documentos?.rg == "S"
                        ? { color: "#000" }
                        : { color: "#aaa" }
                    }
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio />}
                    label="Nao"
                    sx={
                      documentos?.rg == "N"
                        ? { color: "#000" }
                        : { color: "#aaa" }
                    }
                  />
                </RadioGroup>
              </FormControl>
              <FormControl
                className="formControlContainer"
                sx={{ marginTop: 2, marginBottom: 2 }}
              >
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ color: "#394362" }}
                >
                  Apresentou CPF ?
                </FormLabel>
                <RadioGroup
                  style={{ display: "block" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={documentos.cpf}
                  onChange={onChangeDocumentos}
                  name="cpf"
                >
                  <FormControlLabel
                    value={"S"}
                    control={<Radio />}
                    label="Sim"
                    sx={
                      documentos?.cpf == "S"
                        ? { color: "#000" }
                        : { color: "#aaa" }
                    }
                  />
                  <FormControlLabel
                    value={"N"}
                    control={<Radio />}
                    label="Nao"
                    sx={
                      documentos?.cpf == "N"
                        ? { color: "#000" }
                        : { color: "#aaa" }
                    }
                  />
                </RadioGroup>
              </FormControl>
              <FormControl
                className="formControlContainer"
                sx={{ marginTop: 2, marginBottom: 2 }}
              >
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ color: "#394362" }}
                >
                  Comprovante de Residencia ?
                </FormLabel>
                <RadioGroup
                  style={{ display: "block" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={"Nao Entregue"}
                  name="comprovante_residencia"
                  value={documentos?.comprovante_residencia}
                  onChange={onChangeDocumentos}
                >
                  <FormControlLabel
                    value="S"
                    control={<Radio />}
                    label="Sim"
                    sx={
                      documentos?.comprovante_residencia === "S"
                        ? { color: "#000" }
                        : { color: "#aaa" }
                    }
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio />}
                    label="Nao"
                    sx={
                      documentos?.comprovante_residencia === "N"
                        ? { color: "#000" }
                        : { color: "#aaa" }
                    }
                  />
                </RadioGroup>
              </FormControl>
              {estado_civil === 'C' &&
                <FormControl
                  className="formControlContainer"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "#394362" }}
                  >
                    Comprovante de Casamento
                  </FormLabel>
                  <RadioGroup
                    style={{ display: "block" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={"Nao Entregue"}
                    name="casamento_igreja"
                    value={documentos?.casamento_igreja}
                    onChange={onChangeDocumentos}
                  >
                    <FormControlLabel
                      value="S"
                      control={<Radio />}
                      label="Sim"
                      sx={
                        documentos?.casamento_igreja === "S"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="Nao"
                      sx={
                        documentos?.casamento_igreja === "N"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                  </RadioGroup>
                  
                </FormControl>
              }
            </div>
            <div style={{ marginTop: 20, marginBottom:10 }}>
              <h3 className="title">
                {" "}
                Documentações Comprobatorio de Sacramentos
              </h3>
            </div>
            <Container style={{ display: "flex", justifyContent: "flex-start", marginTop:10 }}>
              {sacramentos_concluidos.includes("Admissao") && (
                <FormControl
                  className="formControlContainer"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "#394362" }}
                  >
                    Comprovante de Adimissao
                  </FormLabel>
                  <RadioGroup
                    onChange={onChangeDocumentosSacramentos}
                    style={{ display: "block" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={documentosSacramentos.comprovante_admissao}
                    defaultValue={"Nao Entregue"}
                    name="comprovante_admissao"
                  >
                    <FormControlLabel
                      value="S"
                      control={<Radio />}
                      label="Entregue"
                      sx={
                        documentosSacramentos?.comprovante_admissao == "S"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="Nao Entregue"
                      sx={
                        documentosSacramentos?.comprovante_admissao == "N"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                    
                  </RadioGroup>
                  {documentosSacramentos.comprovante_admissao=='S'&&
                  <FormControl sx={{ width: '100%' }}>
                    <Grow in={true}>

                    <div className='inputDataSacContainer' >
                      <div style={{display:'flex', flexDirection:'column'}}>
                      <FormLabel>Inicio</FormLabel>
                      <input className='inputDataSac' name='A' onChange={onChangeDataSacramentoInicio} type='date' pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"></input>
                      </div>
                      <div style={{display:'flex', flexDirection:'column'}}>
                      <FormLabel>Conclusão</FormLabel>
                      <input className='inputDataSac'  name='A' onChange={onChangeDataSacramentoFechamento}  type='date'></input>
                      </div>
                    </div>
                    </Grow>
                  </FormControl>
                  }

                </FormControl>
              )}
              {sacramentos_concluidos.includes("Batismo") && (
                <FormControl
                  className="formControlContainer"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "#394362"}}
                  >
                    Comprovante de Batismo
                  </FormLabel>
                  <RadioGroup
                    style={{ display: "block" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={documentosSacramentos.comprovante_batismo}
                    onChange={onChangeDocumentosSacramentos}
                    name="comprovante_batismo"
                  >
                    <FormControlLabel
                      value={"S"}
                      control={<Radio />}
                      label="Entregue"
                      sx={
                        documentosSacramentos?.comprovante_batismo == "S"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                    <FormControlLabel
                      value={"N"}
                      control={<Radio />}
                      label="Nao Entregue"
                      sx={
                        documentosSacramentos?.comprovante_batismo == "N"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                  </RadioGroup>
                  {documentosSacramentos.comprovante_batismo=='S'&&
                  <FormControl sx={{ width: '100%' }}>
                    <Grow in={true}>

                    <div className='inputDataSacContainer' >
                      <div style={{display:'flex', flexDirection:'column'}}>
                      <FormLabel>Inicio</FormLabel>
                      <input className='inputDataSac' name='B' onChange={onChangeDataSacramentoInicio} type='date'></input>

                      </div>
                      <div style={{display:'flex', flexDirection:'column'}}>

                      <FormLabel>Conclusão</FormLabel>
                      <input className='inputDataSac' name='B' onChange={onChangeDataSacramentoFechamento} type='date'></input>
                      </div>
                    </div>
                    </Grow>
                  </FormControl>
                  }
                </FormControl>
              )}
              {sacramentos_concluidos.includes("Crisma") && (
                <FormControl
                  className="formControlContainer"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "#394362" }}
                  >
                    Comprovante de Crisma
                  </FormLabel>
                  <RadioGroup
                    style={{ display: "block" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={"Nao Entregue"}
                    name="comprovante_crisma"
                    value={documentosSacramentos?.comprovante_crisma}
                    onChange={onChangeDocumentosSacramentos}
                  >
                    <FormControlLabel
                      value="S"
                      control={<Radio />}
                      label="Entregue"
                      
                      sx={
                        documentosSacramentos?.comprovante_crisma === "S"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="Nao Entregue"
                      sx={
                        documentosSacramentos?.comprovante_crisma === "N"
                          ? { color: "#000"}
                          : { color: "#aaa" }
                      }
                    />
                  </RadioGroup>
                  {documentosSacramentos.comprovante_crisma=='S'&&
                  <FormControl sx={{ width: '100%' }}>
                    <Grow in={true}>

                    <div className='inputDataSacContainer' >
                      <div style={{display:'flex', flexDirection:'column'}}>
                      <FormLabel>Inicio</FormLabel>
                      <input className='inputDataSac' name='C' onChange={onChangeDataSacramentoInicio} type='date'></input>

                      </div>
                      <div style={{display:'flex', flexDirection:'column'}}>

                      <FormLabel>Conclusão</FormLabel>
                      <input className='inputDataSac' name='C' onChange={onChangeDataSacramentoFechamento} type='date'></input>
                      </div>
                    </div>
                    </Grow>
                  </FormControl>
                  }
                </FormControl>
              )}
              {sacramentos_concluidos.includes("Eucaristia") && (
                <FormControl
                  className="formControlContainer"
                  sx={[{ marginTop: 2, marginBottom: 2 }]}
                >
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "#394362" }}
                  >
                    Comprovante de Eucaristia
                  </FormLabel>
                  <RadioGroup
                    style={{ display: "block" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={"Nao Entregue"}
                    name="comprovante_eucaristia"
                    value={documentosSacramentos?.comprovante_eucaristia}
                    onChange={onChangeDocumentosSacramentos}
                  >
                    <FormControlLabel
                      value="S"
                      control={<Radio />}
                      label="Entregue"
                      sx={
                        documentosSacramentos?.comprovante_eucaristia === "S"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="Nao Entregue"
                      sx={
                        documentosSacramentos?.comprovante_eucaristia === "N"
                          ? { color: "#000" }
                          : { color: "#aaa" }
                      }
                    />
                  </RadioGroup>
                  {documentosSacramentos.comprovante_eucaristia=='S'&&
                  <FormControl sx={{ width: '100%' }}>
                    <Grow in={true}>

                    <div className='inputDataSacContainer' >
                      <div style={{display:'flex', flexDirection:'column'}}>
                      <FormLabel>Inicio</FormLabel>
                      <input required className='inputDataSac' name='E' onChange={onChangeDataSacramentoInicio} type='date'></input>

                      </div>
                      <div style={{display:'flex', flexDirection:'column'}}>

                      <FormLabel>Conclusão</FormLabel>
                      <input className='inputDataSac' name='E' onChange={onChangeDataSacramentoFechamento} type='date'></input>
                      </div>
                    </div>
                    </Grow>
                  </FormControl>
                  }
                </FormControl>
              )}
            </Container>
            <FormControl style={{ width: "100%", marginTop: 10 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Sacramentos a performar
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                input={<OutlinedInput label="Sacramentos que Possui" />}
                //@ts-ignore
                renderValue={(selected) => selected.join(", ")}
                //@ts-ignore
                name="sacramentos_concluidos"
                MenuProps={MenuProps}
                value={sacramentosAPerformar}
                onChange={onChangeSacramentosAperformar}
              >
                {renderSacramentosAPerformar()}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ marginTop: 2 }}>
              <InputLabel id="demo-select-small">Escolha uma Turma</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={onChangeTurma}
                label="Escolha uma Turma"
                value={turmaSelecionada}
                sx={{ height: 50 }}
              >
                {turmas.map((turma) => (
                  <MenuItem value={turma.id}>{turma.descricao}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ width: "20%", marginTop: 2 }}>
              <InputLabel id="demo-select-small">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(event) => setStatus(event.target.value)}
                label="Genero"
                value={status}
                sx={{ height: 50 }}
              >
                <MenuItem value={"A"}>Ativo</MenuItem>
                <MenuItem value={"D"}>Desistente</MenuItem>
              </Select>
            </FormControl>

            <div className="container-buttons">
              <Button
                style={{ background: "#0aa699" }}
                className="button-cadastrar"
                onClick={()=>alert('Ainda nao esta pronto')}
              >
                Salvar Alteração
              </Button>
              <Button
                style={{ background: "#e94847" }}
                className="button-cancelar"
                onClick={(event) => props.navTo(event, 3)}
              >
                Cancelar
              </Button>
              <Alert></Alert>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}


export default Users;



