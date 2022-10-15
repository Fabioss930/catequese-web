import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/button";
import Header from "../../components/header/header";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, ContentButtons } from "./style";
import ModalConfirm from "../../components/modalConfirm";
import { Delete, Edit } from "@mui/icons-material";

import { deleteClasse, getClasseOneUser, getClasses } from "../../services/api";

const Classes = (props) => {
  const columns = [
    { id: "descricao", label: "NOME DA TURMA" },
    { id: "dia_semana", label: "DIA DA SEMANA" },
    { id: "hora", label: "HORÁRIO" },
    { id: "status", label: "STATUS" },
    { id: "data_cad", label: "CADASTRO" },
    { id: "action", label: "AÇÕES" },
    // { id: "data_conclusao", label: "CONCLUSÃO" },
  ];
  const [page, setPage] = useState(0);
  const [userType, setUserType] = useState(props.payload.tipo);
  const [userId, setUserId] = useState(props.payload.id);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [modalConfirm, setModalConfirm] = useState({
    openOrClose: false, //openOrClose: atributo que indica se o modal esta berto ou fechado,
    id: null,
  }); //id: Atributo que provê o id caso queira usar para excluir

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };

  useEffect(() => {
    getClassesApi();
  }, []);

  const getClassesApi = async () => {
    const classes = await getClasses();
    const classeCatechist = await getClasseOneUser(userId);
    if (userType === "CATEQUISTA") {
      setRows(classeCatechist);
    } else {
      setRows(classes);
    }
  };

  const handleModalConfirm = (id) => {
    setModalConfirm({
      openOrClose: !modalConfirm.openOrClose,
      id: id,
    });
  };

  const deleteClasses = async (id) => {
    const deleted = await deleteClasse(id);
    if (deleted.status) {
      const newClasse = rows.filter((e) => e.id !== id);
      setModalConfirm(!modalConfirm);
      setRows(newClasse);
    } else {
      alert("Erro a remover turma!");
    }
  };

  return (
    <>
      <ModalConfirm
        data={modalConfirm}
        closeModal={handleModalConfirm}
        afterFunction={deleteClasses}
        title="Tem certeza que deseja excluir ?"
      />
      <Header title="Turmas" />
      <ContentButtons>
        {userType === "COORDENADOR" && (
          <Button style={Cadastrar} onClick={(event) => props.navTo(event, 6)}>
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
                                <div
                                  style={{
                                    display: "flex",
                                    margin: 1,
                                    paddingBottom: 10,
                                  }}
                                >
                                  {userType === "COORDENADOR" && (
                                    <>
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
                                        onClick={() => props.navTo(row.id, 9)}
                                      >
                                        <Edit fontSize="small" />
                                      </Button>

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
                                        onClick={() =>
                                          handleModalConfirm(row.id)
                                        }
                                      >
                                        <Delete />
                                      </Button>
                                    </>
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
};;;

const Cadastrar = {
  width: "150px",
  height: "50px",
  background: "#0aa699",
  marginRight: "10px",
};

const Remover = {
  width: "150px",
  height: "50px",
  background: "#e94847",
};

const Label = {
  color: "#0d638f",
  fontSize: "14px",
  fontWeight: "bold",
};

export default Classes;
