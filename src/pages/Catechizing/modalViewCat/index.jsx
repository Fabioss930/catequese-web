import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close'
import { getOneCatechizing, getOneUser, getUsers } from '../../../services/api';
import { Label, People } from '@mui/icons-material';
import './style.css'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFF',
 
  boderRadius:20,
  boxShadow: 24,
  p: 4,
  
};

export default function BasicModal(props) {
  const [user,setUser] = React.useState({})
  

React.useEffect(()=>{
  if(props.data.id)getUsers(props.data.id)
},[props.data.id])




const getUsers = (async (id)=>{
  
  const userCurrent = await getOneCatechizing(id)
  
  setUser({
    ...userCurrent,
    data_nascimento: new Date(userCurrent.data_nascimento).toLocaleDateString(),
    data_cad: new Date(userCurrent.data_cad).toLocaleDateString()
  })

})


  return (
    <div>
      
      <Modal
        open={props?.data.openOrClose}
    
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        
        <div onClick={()=>props.closeModal()}>
        <Close fontSize='10'style={{position:'absolute', right:5,top:5,color:'#000'}} />
        <div style={{display:'flex'}}>
        <h3>Dados de Cadastro</h3>
        <People color='info' style={{marginLeft:10}}/>

        </div>
        </div>
        
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <div style={{marginTop:20}}>
            
            <h4>Nome:</h4>
            <h5>{user?.nome}</h5>
            <h4>Data Nasc:</h4>
            <h5>{user?.data_nascimento}</h5>
            <h4>Sexo:</h4>
            <h5>{user?.sexo=='M'?'Masculino':'Feminino'}</h5>
            <h4>Telefone 1:</h4>
            <h5>{user?.telefone_1}</h5>
            <h4>Estado Civil:</h4>
            <h5>{user?.estado_civil=='S'?'Solteiro':'Casado'}</h5>
            <h4>Data de Cadastro:</h4>
            <h5>{user?.data_cad}</h5>
            
          
    
          </div>
        </Box>
      </Modal>
    </div>
  );
}