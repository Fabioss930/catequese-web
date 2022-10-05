import Home from "@mui/icons-material/Home";
import react, { useState, useContext, Children } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/PersonAdd";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "../../components/button";
import { Search } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import Input from "../../components/input";
import { Form } from "@unform/web";
import SearchIcon from "@mui/icons-material/Search";
import { ContentButtons } from "./style";

const columns = [
  { id: "id", label: "Id", minWidth: 17 },
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "Telefone", label: "Telefone", minWidth: 100, align: "center" },
  { id: "dataDeNasc", label: "Data de Nasc", minWidth: 100, align: "center" },
  { id: "idade", label: "Idade", minWidth: 100, align: "center" },

  { id: "dataDeCad", label: "Data de Cad", minWidth: 100, align: "center" },
  { id: "sacramento", label: "Sacramento", minWidth: 100, align: "center" },
  { id: "turma", label: "Turma", minWidth: 100, align: "center" },
  { id: "action", label: "Ações", minWidth: 50, align: "center" },
];

function Catechizing(props) {
  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      idade:'22',
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 2,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      idade:'22',
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      idade:'22',
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      idade:'22',
      turma:'T01',
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      idade:'22',
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 3,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Header title="Catequizandos" />
      <div style={{ paddingLeft: 50 }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: 200, paddingTop: 10, marginBottom: 10 }}>
            <Form style={{ display: "flex", alignItems: "center" }}>
              <Input
                name="text"
                placeholder="Pesquisar Nome"
                style={{ marginLeft: 20 }}
              ></Input>
              <SearchIcon />
            </Form>
          </div>
          <ContentButtons>
            <Button
              style={{
                width: "150px",
                height: "50px",
                background: "#0aa699",
                marginRight: "10px",
                color: "#fff",
              }}
              onClick={(event) => props.navTo(event, 4)}
            >
              Cadastrar
            </Button>

            
          </ContentButtons>
        </div>
        <Paper sx={{ width: "98%", overflow: "hidden", padding: 5 }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ height: 40 }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        style={{height:40}}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}  >
                              {column.id == "action" ? (
                                <div style={{display:'flex',margin:1, paddingBottom:10, justifyContent:'center', alignItems:'center'}}>
                                  <Button
                                    variant="contained"
                                    
                                    style={{marginRight:5,backgroundColor: "#1a2845", height:40, width:40, display:'flex', justifyContent:'center', alignItems:'center'}}
                                    
                                    
                                    onClick={() => console.log(row.id)}
                                  >
                                    <Edit fontSize="small" />
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    style={{backgroundColor: "#1a2845", height:40, width:40, display:'flex', justifyContent:'center', alignItems:'center'}}
                                    onClick={() => console.log(row.id)}
                                  >
                                    <Search fontSize="small" />
                                  </Button>
                                </div>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* {
         catequizandos.map((a)=>{
           return(
             <div style={{heigth:'200px',width:'100%', background:'red', padding:20, margin:5}}>
              {a.nome}
            </div>
          )
          
        })
      } */}
      </div>

      
    </div>
  );
}


export default Catechizing;
