import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close'
import { getOneUser, getUsers } from '../../../services/api';
import { Label } from '@mui/icons-material';
import { ContainerTitle, SubTitle, Title } from '../style';

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
  if(props.data.id) getUsers(props.data.id)
  // 
})


const getUsers = (async (id)=>{
  const userCurrent = await getOneUser(id)
  setUser(userCurrent)

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
        </div>
        
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <div style={{marginTop:20}}>
            
                <Title>Nome:</Title>
                <SubTitle>{user.nome}</SubTitle>

           

            <Title>Usuario:</Title>
            <SubTitle>{user.login}</SubTitle>
              

            
            <Title>Tipo de Usuario:</Title>
            <SubTitle>{user.tipo}</SubTitle>
            
          
    
          </div>
        </Box>
      </Modal>
    </div>
  );
}