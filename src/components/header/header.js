import React from "react";
import Output from '@mui/icons-material/Output';
import Person from '@mui/icons-material/Person';
import './styles.css'
export default function Header(props){


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
            <h5>Kemer Wander</h5>
          </div>

          <Output className="texthover"></Output>
        </div>
      </header>
    );
}