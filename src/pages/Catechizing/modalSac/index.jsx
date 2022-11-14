import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close'
import { getCatInClasse, getDocumentsCatechizing, getOneCatechizing, getOneUser, getSacramentsCatechizing, getUsers } from '../../../services/api';
import { ArrowDropDown, Article, Assignment, Delete, Expand, Label, People } from '@mui/icons-material';
import './style.css'
import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, FormLabel, Grow, Radio, RadioGroup } from '@mui/material';
import { render } from '@testing-library/react';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#FFF',

  boderRadius: 20,
  boxShadow: 24,
  p: 4,

};

export default function BasicModal(props) {

  const [sacraments, setSacraments] = React.useState([
    {
      tipo_sacramento: "A",
      data_inicio: "2000-01-12",
      data_fechamento: "2000-02-12",


    },
    {
      tipo_sacramento: "B",
      data_inicio: "2000-01-12",
      data_fechamento: "2000-02-12",


    },
    {
      tipo_sacramento: "C",
      data_inicio: "2000-01-12",


    },
  ])
  const [sacAPerformar, setSacAperformar] = React.useState([])
  const [sacConcluidos, setSacConcluidos] = React.useState([])


  React.useEffect(() => {
   
    organizarSac(props.data)

  }, [])

  const organizarSac = (sacraments) => {
    let sacConcluidoss = []
    let sacAPerformarr = []
    console.log("TODOS",sacraments)
    sacraments?.forEach((sac) => {
      if (sac.data_inicio && sac.data_fechamento) {
        console.log(sac.tipo_sacramento, "INICIO E FECHAENTO")
        sac.data_inicio = reinverterData(sac.data_inicio)
        sac.data_fechamento = reinverterData(sac.data_fechamento)
        sacConcluidoss.push(sac)

      } else {
        console.log(sac.tipo_sacramento, "SO INICIO")
        sacAPerformarr.push(
          {...sac,
            data_inicio:reinverterData(sac.data_inicio),
          })
      }
    })

    console.log("A PERFOMAR,",sacAPerformarr)
    console.log("CONCLUIDOS,",sacConcluidoss)

    setSacAperformar(sacAPerformarr)
    setSacConcluidos(sacConcluidoss)
  }


  const repliceNomeSacramento = (tipo)=>{
    switch (tipo) {
      case "B":
        return "Batismo"
        break;
      case "A":
        return "Adimissao"
        break;
      case "E":
        return "Eucaristia"
        break;
      case "C":
        return "Crisma"
        break;
    
      
    }

    const reinverterData = (data)=>{
      if(data) {
        const date = new Date(data).toLocaleDateString()
      const arrayData = date.split("/")
      return `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
      }else{
  
        const date = new Date().toLocaleDateString()
        const arrayData = date.split("/")
        return `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
      }
  }
}

const renderAperformar = ()=>{
  return (
    sacAPerformar.map((sac)=>{

      return(
        <div style={{margin:10 ,boxShadow:10,border:"1px solid #000",borderRadius:10, display:'list-item' }} className="formControlContainer">
          <Delete onClick={(()=>alert(`Excluir Este ${sac.id}`))} style={{backgroundColor:'red',height:15,width:15,marginLeft:'90%'}}/>
          <h4 style={{textAlign:'center'}}>
          {repliceNomeSacramento(sac.tipo_sacramento)}
          </h4>
          <h5 style={{display:'list-item'}}>
            Data de Inicio: 
          </h5>
          <h5 style={{textAlign:'center'}}>
            {`  ${sac.data_inicio}`}
            
          </h5>

        </div>
      )

    })
  )
}


const reinverterData = (data)=>{
  if(data) {
    const date = new Date(data).toLocaleDateString()
  const arrayData = date.split("/")
  return `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
  }else{

    const date = new Date().toLocaleDateString()
    const arrayData = date.split("/")
    return `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
  }
}

  const renderConcluidos = () => {
    return (
      sacConcluidos.map((sac) => {
        return (

          <FormControl
            className="formControlContainer"
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ color: "#394362" }}
            >
              Comprovante de {repliceNomeSacramento(sac.tipo_sacramento)}
            </FormLabel>
            <RadioGroup
              style={{ display: "block" }}
              aria-labelledby="demo-radio-buttons-group-label"

              name="comprovante_batismo"
            >
              <FormControlLabel
                value={"S"}
                control={<Radio />}
                label="Entregue"
                sx={{ color: "#000" }}

              />
              <FormControlLabel
                value={"N"}
                control={<Radio />}
                label="Nao Entregue"
                sx={{ color: "#000" }}

              />
            </RadioGroup>
            <FormControl sx={{ width: '100%' }}>
              <Grow in={true}>

                <div className='inputDataSacContainer' >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Inicio</FormLabel>
                    <input className='inputDataSac' name='B' type='date' value={sac.data_inicio}></input>

                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <FormLabel>Conclusão</FormLabel>
                    <input className='inputDataSac' name='B' type='date' value={sac.data_fechamento}></input>
                  </div>

                </div>
              </Grow>
            </FormControl>
          </FormControl>


        )
      }


      )
    )
  }

  return (
    <div>

      <Modal
        open={props?.openOrClose}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <div onClick={() => props.closeModal()}>
            <Close fontSize='10' style={{ position: 'absolute', right: 5, top: 5, color: '#000' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 20, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>

                  <h3>Sacrametos Concluidos</h3>
                  <People color='info' style={{ marginLeft: 10 }} />
                </div>
                <Button>Adicionar</Button>

              </div>
              <div style={{ display: "flex" }}>
                {renderConcluidos()}

              </div>
            </div>
            <div style={{ padding: 20, width: '100%', borderLeftWidth: 10, borderLeftColor: '#000' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>

                  <h3>Sacrametos a Performar</h3>
                  <Assignment color='info' style={{ marginLeft: 10 }} />
                </div>
                <Button>Adicionar</Button>

              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.title}
              </Typography>
              <div style={{ marginTop: 20,display:'flex' }}>
               {renderAperformar()}
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end'}}>

          <Button
                type='onSubmit'
                style={{ background: "#0aa699",color:'#fff',marginRight:2 }}
                className="button-cadastrar"
               
              >
                Cadastrar
              </Button>
              <Button
                style={{ background: "#e94847",color:'#fff'  }}
                className="button-cancelar"
                onClick={()=>props.closeModal()}
             
              >
                Cancelar
              </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}