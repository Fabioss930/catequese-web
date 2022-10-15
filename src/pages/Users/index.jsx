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
import { deleteUser, getOneUser, getUsers } from "../../services/api";
import { padding } from "polished";
import { flexbox } from "@mui/system";
import ModalConfirm from '../../components/modalConfirm'
import ModalViewUser from './modalViewUser'

const columns = [
  { id: "nome", label: "NOME" },
  { id: "login", label: "LOGIN" },
  { id: "tipo", label: "PERFIL" },
  { id: "data_cad", label: "CADASTRO" },
  { id: "action", label: "AÇÕES" }
];

const Users = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userType, setUserType] = useState(props.payload.tipo);
  const [users, setUsers] = useState([]);
  const [usersFilters] = useState([]);
  const [modalConfirm, setModalConfirm] = useState({
    openOrClose: false, //openOrClose: atributo que indica se o modal esta berto ou fechado,
    id: null,
  }); //id: Atributo que provê o id caso queira usar para excluir
  const [modalViewUser, setModalViewUser] = useState({
    openOrClose: false, //openOrClose: atributo que indica se o modal esta berto ou fechado,
    id: null,
  });

  useEffect(() => {
    getUsersApi();
    console.log("PAYLOADDDDDDDDDD ", props.payload);
  }, []);

  const handleModalConfirm = (id) => {
    setModalConfirm({
      openOrClose: !modalConfirm.openOrClose,
      id: id,
    });
  };
  const handleModalViewUser = (id) => {
    setModalViewUser({
      openOrClose: !modalViewUser.openOrClose,
      id: id,
    });
  };

  const getUsersApi = async () => {
    console.log("PAYLOADDDDDDDDDD ", props.payload);
    if (props.payload.tipo == "CATEQUISTA") {
      const oneUser = await getOneUser(props.payload.id);
      setUsers([oneUser]);
    } else {
      const data = await getUsers();
      const userss = data.map((a) => {
        const date = new Date(a?.data_cad);
        return {
          ...a,
          data_cad: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        };
      });

      setUsers(userss);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };
  const deleteUserr = async (id) => {
    const deleted = await deleteUser(id);
    if (deleted.status) {
      const newUser = users.filter((cat) => cat.id != id);
      setModalConfirm(!modalConfirm);
      setUsers(newUser);
    } else {
      alert("Erro ao cadastrar usuario!");
    }
  };

  return (
    <>
      <ModalConfirm
        data={modalConfirm}
        closeModal={handleModalConfirm}
        afterFunction={deleteUserr}
        title="Tem certeza que deseja excluir ?"
      />
      <ModalViewUser data={modalViewUser} closeModal={handleModalViewUser} />
      <Header title="Usuários" />
      <ContentButtons>
        {userType === "COORDENADOR" && (
          <Button style={Cadastrar} onClick={(event) => props.navTo(event, 2)}>
            Cadastrar
          </Button>
        )}
      </ContentButtons>
      <Container>
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer sx={{}}>
            <Table>
              <TableHead>
                <TableRow sx={{}}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={Label} aling="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        style={{ height: 40 }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        aling="center"
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ color: "#576475" }}

                              ///////////////////////////////////////////
                            >
                              {column.id === "action" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    margin: 1,
                                    paddingBottom: 10,
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      marginRight: 5,
                                      backgroundColor: "#1a2845",
                                      height: 40,
                                      width: 40,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => props.navTo(row.id, 10)}
                                  >
                                    <Edit fontSize="small" />
                                  </Button>

                                  {props.payload.tipo != "CATEQUISTA" && (
                                    <Button
                                      variant="outlined"
                                      style={{
                                        backgroundColor: "#1a2845",
                                        marginLeft: 5,
                                        height: 40,
                                        width: 40,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      onClick={() => handleModalConfirm(row.id)}
                                    >
                                      <Delete />
                                    </Button>
                                  )}
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
            count={users.length}
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