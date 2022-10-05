import React, { useEffect, useState } from "react";
import Output from '@mui/icons-material/Output';
import Person from '@mui/icons-material/Person';
import './styles.css'
import { useNavigate } from "react-router-dom";
import { getOneUser } from "../../services/api";
export default function Header(props){
  const navigation = useNavigate()
  const [nomeUser, setNomeUser] = useState('Usuario')

  useEffect(()=>{
    
    getUser()

  },[])

  const getUser = async ()=>{
      
      const user = await getOneUser(localStorage.getItem('idUser'))
      setNomeUser(user.nome)
  }
  const logof = ()=>{
    if(localStorage.getItem('loged')) localStorage.removeItem('loged')
    navigation('/login')

  }


    return (
      <header
        style={{
          height: 80,
          backgroundColor: "#fff",
          boxShadow: "0 0 2px #999",
          display: "flex",
          alignItems: "center ",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
          color: "#505458",
        }}
      >
        <div>
          {props.icon}
          <h2>{props.title}</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 20,
            }}
            className="texthover"
          >
            <Person></Person>
            <h5>{nomeUser}</h5>
          </div>
          <div onClick={()=>logof()}>
          <Output className="texthover"></Output>
          </div>
        </div>
      </header>
    );
}