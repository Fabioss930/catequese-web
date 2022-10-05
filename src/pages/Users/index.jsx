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
import { Edit } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { getUsers } from "../../services/api";


const columns = [
  { id: "id", label: "Id", minWidth: 17,align:'center' },
  { id: "nome", label: "Nome", minWidth: 100,align:'center' },
  { id: "login", label: "Login", minWidth: 100, align:'center' },
  { id: "data_cad", label: "Data de Cadastro", minWidth: 100,align:'center' },

];








const Users = (props) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([])


    useEffect(()=>{
    getUsersApi()
    
    
},[])

    const getUsersApi = async()=>{
      const users = await getUsers()
      if (users) {
        console.log(users)
        setRows(users)
        
      }else{
        console.log('Nao foi possivel buscar usuarios ')
      }
    }


    const handleChangePage = (event, newPage) => {
      
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      
      setPage(0);
      
    };


    const renderTable = ()=>{
      return(
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
      )
    }
console.log(rows.length)


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
       {rows.length>=0?renderTable():<h4 style={{color:'#000', width:'100%', textAlign:'center'}}>Nenhum Usuario Cadastrado!</h4>}
      
      </Container>
    </>
  );
};

const Cadastrar = {
  width: "150px",
  height: "50px",
  background: "#0aa699",
  marginRight: "10px",
  color:'#fff'
};

const Remover = {
  width: "150px",
  height: "50px",
  background: "#e94847",
  color:'#fff'
};

export default Users;
