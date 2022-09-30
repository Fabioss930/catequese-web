import People from '@mui/icons-material/People';
import Header from '../../../components/header/header';
import ArrowBack from '@mui/icons-material/ArrowBack'
import Alert from '@mui/icons-material/CrisisAlert'
import { Form } from '@unform/web';
import { Select, MenuItem, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, TextField, InputLabel, Stack } from '@mui/material'
import Input from '../../../components/input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from '../../../components/button';
import { useState } from 'react'

import './Register.css'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';



function Users(props) {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState("")
  const [sacramento, setSacramento] = useState([])
  const [genero, setGenero] = useState("")
  const [data_nascimento, setData_nascimento] = useState(0)
  const [estado_civil, setEstado_civil] = useState("")
  const [documentos, setDocumentos] = useState({
    rg: "N", 
    cpf: "N",
    CR: "N", //Comprovante de Residencia
    CC: "N" //Comprovante de Casamento
  })

  const onChangeNome = (event) => {
    setNome(event.target.value)

  }


  const onChangeGenero = (event) => {
    setGenero(event.target.value)

  }
  const onChangeDataNasc = (event) => {
    if(event){
      const years = calcularIdade(event.$y, event.$M, event.$D)
      setIdade(years)
      setData_nascimento(event.$d)
    }
  }

  const onChangeEstadoCivil = (event) => {
    setEstado_civil(event.target.value)

  }
  const onChangeDocumentos = (event) => {

    setDocumentos({
      ...documentos,
      [event.target.name]: event.target.value
    })
  }


  const onChangeSacramento = (event) => {
    console.log(event)
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

  const Sacramentos = [
    "Eucaristia",
    "Batismo",
    "Crisma"

  ];


  return (
    <div className='container'>
      <Header title='Catequizandos > Cadastro' />
      <div style={{ padding: 20 }}>

        <ArrowBack onClick={(event) => props.navTo(event, 3)} sx={{ ":hover": { color: '#ff9000' }, color: '#394362' }} />
        <div className="container-register">
          <Form style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <TextField id="outlined-basic" label="Nome" name='text' value={nome} onChange={onChangeNome} variant="outlined" sx={{ marginBottom: 2 }} />
            <div className='container-duble'>
              <FormControl variant="outlined" sx={{ width: '49%' }}>
                <InputLabel id="demo-select-small">Genero</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={onChangeGenero}
                  label="Genero"
                  value={genero}

                  sx={{ height: 50 }}
                >
                  <MenuItem value={'M'}>Masculino</MenuItem>
                  <MenuItem value={'F'}>Feminino</MenuItem>

                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ width: '49%' }} >
                <InputLabel id="demo-select-small">Estado Civil</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={onChangeEstadoCivil}
                  label="Dia da Semana"
                  value={estado_civil}
                  name='estado_civil'
                  sx={{ height: 50 }}
                >
                  <MenuItem value={"C"}>Casado(a)</MenuItem>
                  <MenuItem value={"S"}>Solteiro(a)</MenuItem>
                  <MenuItem value={"V"}>Viúvo(a)</MenuItem>
                  <MenuItem value={"D"}>Divorciado(a)</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>

            </div>



            <div className='container-duble'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack sx={{width:'80%'}} spacing={3}>
              <DesktopDatePicker
              label="Data de nascimento"
              inputFormat="MM/DD/YYYY"
              value={data_nascimento}
              onChange={onChangeDataNasc}
              renderInput={(params) => <TextField  sx={{height:'100%',borderRadius:10,padding:0, marginTop:1, marginRight:1}} {...params} />}
            />
              </Stack>
              </LocalizationProvider>
              <FormControl sx={{ width: '49%' }}>

              <Input name='idade' placeholder='Idade' type='text' style={{ fontSize: 15 }} disabled value={idade + ' Anos'} />
              </FormControl>
            
            


            </div>
            <div className='container-duble'>
              <FormControl sx={{ width: '49%' }}>

                <Input name='text' placeholder='numero' type='text' style={{ fontSize: 15 }} />
              </FormControl>
              <FormControl sx={{ width: '49%' }}>

                <Input name='text' placeholder='Numero 2' type='text' style={{ fontSize: 15 }} />
              </FormControl>

            </div>

            <FormControl sx={{ marginTop: 2 }}>
              <FormLabel id='demo-radio-buttons-group-label' style={{ color: '#394362' }}>Apresentou RG ?</FormLabel>
              <RadioGroup onChange={onChangeDocumentos} aria-labelledby='demo-radio-buttons-group-label' value={documentos.rg} defaultValue={"Nao Entregue"} name="rg">
                <FormControlLabel value="S" control={<Radio />} label="Sim" sx={documentos?.rg == "S" ? { color: '#000' } : { color: '#aaa' }} />
                <FormControlLabel value="N" control={<Radio />} label="Nao" sx={documentos?.rg == "N" ? { color: '#000' } : { color: '#aaa' }} />

              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label' style={{ color: '#394362' }}>Apresentou CPF ?</FormLabel>
              <RadioGroup aria-labelledby='demo-radio-buttons-group-label' value={documentos.cpf} onChange={onChangeDocumentos} name="cpf">
                <FormControlLabel value={"S"} control={<Radio />} label="Sim" sx={documentos?.cpf == "S" ? { color: '#000' } : { color: '#aaa' }} />
                <FormControlLabel value={"N"} control={<Radio />} label="Nao" sx={documentos?.cpf == "N" ? { color: '#000' } : { color: '#aaa' }} />

              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label' style={{ color: '#394362' }} >Apresentou Comprovante de Residencia ?</FormLabel>
              <RadioGroup aria-labelledby='demo-radio-buttons-group-label' defaultValue={"Nao Entregue"} name="CR" value={documentos?.CR} onChange={onChangeDocumentos}>
                <FormControlLabel value="S" control={<Radio />} label="Sim" sx={documentos?.CR === "S" ? { color: '#000' } : { color: '#aaa' }} />
                <FormControlLabel value="N" control={<Radio />} label="Nao" sx={documentos?.CR === "N" ? { color: '#000' } : { color: '#aaa' }} />

              </RadioGroup>
            </FormControl>

            <div className='container-buttons'>
              <Button style={{ width: '150px', height: '50px', backgroundColor: '#e94847' }} className="button-cadastrar">Cadastrar</Button>
              <Button className='button-cadastrar' onClick={event => props.navTo(event, 4)}>Cancelar</Button>
              <Alert ></Alert>

            </div>




          </Form>

        </div>
      </div>


    </div>
  );
}


export default Users;

