
import People from '@mui/icons-material/People';
import Header from '../../../components/header/header';
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Form } from '@unform/web';
import { Select, MenuItem } from '@mui/material'
import Input from '../../../components/input';
import Button from '../../../components/button';
import {useState} from 'react'

import '../Register/Register.css'


function Users(props) {
  const [catec, setCatec] = useState({})


  const onChange = (text) => {
    setCatec({
        ...catec,
        [text.name]: text.value
    })
}


  return (
    <div className='container'>
      <Header title='Cadastro' />
      <div style={{ padding: 20 }}>

        <ArrowBack onClick={(event) => props.navTo(event, 0)} sx={{ ":hover": { color: '#ff9000' } }} />
        <div className="container-register">
          <Form style={{ width: '25%' }}>
            <div className='container-input'>
              <h3 className='title'>Tipo de Sacramento:</h3>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Cidade"
                onChange={(text) => (text) => onChange(text.target)}
                placeholder='Cidade'
                name='city'
                value={catec?.city}
                sx={{ width: '100%', height: 40 , color:'#fff', backgroundColor:'rgb(26 17 31)'}}
              >
                <MenuItem value={'Batismo'}>Batismo</MenuItem>
                <MenuItem value={'Eucaristia'}>Eucaristia</MenuItem>
                <MenuItem value={'Chrisma'}>Chrisma</MenuItem>
              </Select>

            </div>
            <h3 className='title'>Nome:</h3>
            <Input name='text' placeholder='Digite o nome do Catequizando' style={{ fontSize: 12 }} />
            <h3 className='title'>Email:</h3>
            <Input name='text' placeholder='@hotmail.com' style={{ fontSize: 12 }}  required/>
            <h3 className='title'>Data de Nasc:</h3>
            <Input name='text' placeholder='@hotmail.com' type='date' style={{ fontSize: 12 }} />
            <h3 className='title'>Comprovante de Residencia</h3>
          
            <Button>Cadastrar</Button>


            

          </Form>

        </div>
      </div>


    </div>
  );
}

export default Users;

