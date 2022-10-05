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

import { getClasses } from "../../services/api";

const Classes = (props) => {
  const columns = [
    { id: "descricao", label: "NOME DA TURMA" },
    { id: "dia_semana", label: "DIA DA SEMANA" },
    { id: "hora", label: "HORÁRIO" },
    { id: "status", label: "STATUS" },
    { id: "data_cad", label: "CADASTRO" },
    { id: "data_conclusao", label: "CONCLUSÃO" },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

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

    setRows(classes);
  };

  return (
    <>
      <Header title="Turmas" />
      <ContentButtons>
        <Button style={Cadastrar} onClick={(event) => props.navTo(event, 6)}>
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
                                <div
                                  style={{
                                    display: "flex",
                                    margin: 1,
                                    paddingBottom: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                ></div>
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
