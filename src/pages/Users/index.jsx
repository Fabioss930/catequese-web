import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import Header from "../../components/header/header";
import { Container, ContentButtons } from "./style";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Delete, Edit } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { deleteUser, getUsers } from "../../services/api";
import { padding } from "polished";
import { flexbox } from "@mui/system";

const columns = [
  { id: "nome", label: "NOME" },
  { id: "login", label: "LOGIN" },
  { id: "tipo", label: "PERFIL" },
  { id: "data_cad", label: "CADASTRO" },
  {id:"action",label:"AÇÕES"}
];

const Users = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getUsersApi();
  }, []);

  const getUsersApi = async () => {
    const users = await getUsers();

    setRows(users);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };
  const deleteUserr = async(id)=>{
    const deleted = await deleteUser(id)
    alert('Usuario Deletado com sucesso')
    
    //Nao ta atualizando a Tela
    

  }

  return (
    <>
      <Header title="Usuários" />
      <ContentButtons>
        <Button style={Cadastrar} onClick={(event) => props.navTo(event, 2)}>
          Cadastrar
        </Button>
        <Button style={Remover}>Remover</Button>
      </ContentButtons>
      <Container>
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer sx={{}}>
            <Table>
              <TableHead>
                <TableRow sx={{}}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={Label}>
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
                        style={{ height: 40 }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ color: "#576475" }}
                            >
                              {column.id === "action" ? (
                                <div style={{display:'flex',margin:1, paddingBottom:10, justifyContent:'center', alignItems:'center'}}>
                                <Button
                                  variant="contained"
                                  
                                  style={{marginRight:5,backgroundColor: "#1a2845", height:40, width:40, display:'flex', justifyContent:'center', alignItems:'center'}}
                                  
                                  
                                  onClick={() => props.navTo('',8,row.id)}
                                >

                                  <Edit fontSize="small" />
                                </Button>
                                
                                <Button
                                  variant="outlined"
                                  style={{backgroundColor: "#1a2845", marginLeft:5,height:40, width:40, display:'flex', justifyContent:'center', alignItems:'center'}}
                                  onClick={() => deleteUserr(row.id)}
                                >
                                  <Delete/>
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
      </Container>
    </>
  );
};

const Cadastrar = {
  width: "150px",
  height: "50px",
  background: "#0aa699",
  marginRight: "10px",
  color: "#fff",
};

const Remover = {
  width: "150px",
  height: "50px",
  background: "#e94847",
  color: "#fff",
};

const Label = {
  color: "#0d638f",
  fontSize: "14px",
  fontWeight: "bold",
};

export default Users;