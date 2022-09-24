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
  { id: "sacramento", label: "Sacramento", minWidth: 100, align: "center" },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
    align: "center",
  },
  { id: "dataDeNasc", label: "Data de Nasc", minWidth: 100, align: "center" },
  { id: "dataDeCad", label: "Data de Cad", minWidth: 100, align: "center" },
  { id: "type_user", label: "Tipo de Usuario", minWidth: 100, align: "center" },
  { id: "action", label: "Ações", minWidth: 50, align: "center" },
];

function Catechizing(props) {
  const actions = [{ icon: <SaveIcon />, name: "Cadastro de Catequizando" }];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "kemer",
      email: "kemer_souza@hotmail.com",
      sacramento: "--",
      dataDeNasc: "12/01/2000",
      dataDeCad: "05/09/2022",
    },
    {
      id: 2,
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
                placeholder="Pesquisar"
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

            <Button
              style={{
                width: "150px",
                height: "50px",
                background: "#e94847",
                color: "#fff",
              }}
            >
              Remover
            </Button>
          </ContentButtons>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden", padding: 5 }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
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
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id == "action" ? (
                                <div>
                                  <Button
                                    variant="contained"
                                    sx={[
                                      styleButtom,
                                      { backgroundColor: "#ff9000" },
                                    ]}
                                    size="5"
                                    onClick={() => console.log(row.id)}
                                  >
                                    <Edit fontSize="small" />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={styleButtom}
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

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: 50,
          right: 20,
          height: 150,
          width: 150,
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(event) => props.navTo(event, 1)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
const styleButtom = {
  margin: 0.3,
  with: 10,
  padding: 0,
  height: 20,
};

export default Catechizing;
