import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close'
import { getCatInClasse, getDocumentsCatechizing, getOneCatechizing, getOneUser, getSacramentsCatechizing, getUsers } from '../../../services/api';
import { ArrowDropDown, Article, Assignment, Expand, Label, People } from '@mui/icons-material';
import './style.css'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { render } from '@testing-library/react';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: '#FFF',

  boderRadius: 20,
  boxShadow: 24,
  p: 4,

};

export default function BasicModal(props) {
  const [user, setUser] = React.useState({})
  const [documents, setDocumets] = React.useState({})
  const [turma, setTurma] = React.useState("")
  const [sacraments, setSacraments] = React.useState([])
  


  React.useEffect(() => {
    if (props.data.id) {
      getUsers(props.data.id)
      getDocumentsCat(props.data.id)
      getTurma(props.data.id)
      getSacrments(props.data.id)
      
    }
  }, [props.data.id])




  const getUsers = (async (id) => {

    const userCurrent = await getOneCatechizing(id)

    setUser({
      ...userCurrent,
      data_nascimento: new Date(userCurrent.data_nascimento).toLocaleDateString(),
      data_cad: new Date(userCurrent.data_cad).toLocaleDateString()
    })

  })
  const getTurma = async (id)=>{
    const turma = await getCatInClasse(id)
    setTurma(turma[0].descricao)
  }  

  const getDocumentsCat = async (id)=>{
    const documentsCurrent = await getDocumentsCatechizing(id)
    console.log("DOCUMENTOS:", documentsCurrent)
    setDocumets(documentsCurrent)
  }
  const getSacrments = async (id) =>{
    const sacramentsCurrent = await getSacramentsCatechizing(id)
    console.log("Sacrametos:", sacramentsCurrent)
    if(sacramentsCurrent){
      setSacraments(sacramentsCurrent)
    }
  }

  const renderStatusScramento = (sac)=>{

      switch (sac.tipo_sacramento) {
        case "A":
          if(sac.data_inicio&&sac.data_fechamento){
            return(
          
              <b style={{color:'rgb(10, 166, 153)'}}>Concluido</b>
              )
              }else{
                return(<b style={{color:'#ff9000'}}>Em Processo</b>)
          }

          break;
        case "B":
          if(sac.data_inicio&&sac.data_fechamento){
            return(
          
              <b style={{color:'rgb(10, 166, 153)'}}>Concluido</b>
              )
              }else{
                return(<b style={{color:'#ff9000'}}>Em Processo</b>)
          }
          break;
        case "C":
          if(sac.data_inicio&&sac.data_fechamento){
            return(
          
              <b style={{color:'rgb(10, 166, 153)'}}>Concluido</b>
              )
              }else{
                return(<b style={{color:'#ff9000'}}>Em Processo</b>)
          }
          break;
        case "E":
          if(sac.data_inicio&&sac.data_fechamento){
            return(
          
              <b style={{color:'rgb(10, 166, 153)'}}>Concluido</b>
              )
              }else{
                return(<b style={{color:'#ff9000'}}>Em Processo</b>)
          }
          break;
      
        default:
          break;
      }
    
  }
{/* <h5>Padrinho: Moises</h5>
                    <h5>Madrinha: Maria</h5> */}

  const getNome = (tipo)=>{
    switch (tipo) {
      case "B":
        return "Batismo"
        break;
      case "A":
        return "Admissão"
        break;
      case "C":
        return "Crisma"
        break;
      case "E":
        return "Eucaristia"
        break;
    }

  }
  const renderSacraments = ()=>{

    return(
      sacraments.map((sac,i)=>{

        console.log('Passou aqui',sac)
        return(
        
          <Accordion >
                      <AccordionSummary
                        expandIcon={<ArrowDropDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{getNome(sac.tipo_sacramento)} - {renderStatusScramento(sac)}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                        <h5>Data de Inicio: {new Date(sac.data_inicio).toLocaleDateString()}</h5>
                        {sac.data_fechamento&&<h5>Data de Conclusao: {new Date(sac.data_fechamento).toLocaleDateString()}</h5>}
                        
    
                      </AccordionDetails>
                    </Accordion>
               
          
        )})

    )

    
  }

  return (
    <div>

      <Modal
        open={props?.data.openOrClose}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <div onClick={() => props.closeModal()}>
            <Close fontSize='10' style={{ position: 'absolute', right: 5, top: 5, color: '#000' }} />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ padding: 20, width: '100%' }}>
              <div style={{ display: 'flex' }}>
                <h3>Dados de Cadastro</h3>
                <People color='info' style={{ marginLeft: 10 }} />

              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.title}
              </Typography>
              <div style={{ marginTop: 20 }}>

                <h4>Nome:</h4>
                <h5>{user?.nome}</h5>
                <h4>Data Nasc:</h4>
                <h5>{user?.data_nascimento}</h5>
                <h4>Sexo:</h4>
                <h5>{user?.sexo == 'M' ? 'Masculino' : 'Feminino'}</h5>
                <h4>Telefone 1:</h4>
                <h5>{user?.telefone_1}</h5>
                <h4>Estado Civil:</h4>
                <h5>{user?.estado_civil == 'S' ? 'Solteiro' : 'Casado'}</h5>
                <h4>Data de Cadastro:</h4>
                <h5>{user?.data_cad}</h5>
                <h4>Turma</h4>
                <h5>{turma}</h5>
              </div>
            </div>
            <div style={{ padding: 20, width: '100%' }}>
              <div style={{ display: 'flex' }}>
                <h3>Doumentos</h3>
                <Article color='info' style={{ marginLeft: 10 }} />

              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.title}
              </Typography>
              <div style={{ marginTop: 20 }}>
                <h4>RG:</h4>
                <h5>{documents.rg=="S"?"Entregue":"Nao Entregue"}</h5>
                <h4>Cpf:</h4>
                <h5>{documents.cpf=="S"?"Entregue":"Nao Entregue"}</h5>
                <h4>Comprovante de Residencia:</h4>
                <h5>{documents.comprovante_residencia=="S"?"Entregue":"Nao Entregue"}</h5>
                {user.estado_civil=="C"&&
                <>
                <h4>Comprovante de Casamento:</h4>
                <h5>Entregue</h5>
                </>
                }

              </div>
            </div>
            <div style={{ padding: 20, width: '100%', borderLeftWidth: 10, borderLeftColor: '#000' }}>
              <div style={{ display: 'flex' }}>
                <h3>Dados de Sacramentos</h3>
                <Assignment color='info' style={{ marginLeft: 10 }} />

              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.title}
              </Typography>
              <div style={{ marginTop: 20 }}>
                {sacraments&&renderSacraments()}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}