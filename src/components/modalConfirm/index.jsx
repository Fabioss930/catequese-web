import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1a2845',
 
  boderRadius:20,
  boxShadow: 24,
  p: 4,
  
};

export default function BasicModal(props) {
  

  console.log(props.data)

  return (
    <div>
      
      <Modal
        open={props.data?.openOrClose}
    
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        
        <div onClick={()=>props.closeModal(null)}>
        <Close onCl fontSize='10'style={{position:'absolute', right:5,top:5}} />
        </div>
        
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <div style={{marginTop:20}}>

          
          <Button
              style={{
                width: "150px",
                height: "50px",
                background: "#0aa699",
                marginRight: "10px",
                color: "#fff",
              }}
              onClick={()=>props.afterFunction(props.data.id)}
            >
              Sim
            </Button>
            <Button
              style={{
                width: "150px",
                height: "50px",
                background: "red",
                marginRight: "10px",
                
                color: "#fff",
              }}
              onClick={()=>props.closeModal(null)}
            >
              Nao
            </Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}