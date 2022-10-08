import Home from "@mui/icons-material/Home";
import react, { useState, useContext, Children, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "../../components/button";
import ModalConfirm from '../../components/modalConfirm'
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import Input from "../../components/input";
import { Form } from "@unform/web";
import SearchIcon from "@mui/icons-material/Search";
import { ContentButtons } from "./style";
import { deleteCatechizing, getCatechizing } from "../../services/api";

//<IMaskInput name='number' style={{ maxWidth: 200, height: 50, marginLeft: 10, marginBottom: 10 }} className="form-control" placeholder="(67) 9 0000-0000" mask='(00) 0 0000-0000' onChange={(text) => onChange(text.target)}

const columns = [

  { id: "nome", label: "Nome", minWidth: 100 },
  { id: "data_nascimento", label: "Data de Nasc", minWidth: 100, align: "center" },

  { id: "todos_sac", label: "Todos Sacramentos", minWidth: 100, align: "center" },
  { id: "padrinho", label: "padrinho/Madrinha", minWidth: 100, align: "center" },
  { id: "turma", label: "Turma", minWidth: 100, align: "center" },
  { id: "action", label: "Ações", minWidth: 50, align: "center" },
];

function Catechizing(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [catechizingAll, setCatechizingAll] = useState([]);
  const [catechizingFilter, setCatechizingFilter] = useState([]);
  const [modalConfirm, setModalConfirm] = useState({
    openOrClose: false, //openOrClose: atributo que indica se o modal esta berto ou fechado,
    id: null,
  }); //id: Atributo que provê o id caso queira usar para excluir

  useEffect(() => {
    getCatequizandos();
  }, []);

  const onChangeSearch = (text) => {
    setSearch(text);
    const filter = catechizingAll.filter((cat) => cat.nome.includes(text));
    setCatechizingFilter(filter);
  };

  const getCatequizandos = async () => {
    const cat = await getCatechizing(); ///Busca na api
    const p = cat.map((a) => {
      const date = new Date(a?.data_nascimento);
      return {
        ...a,
        data_nascimento: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        todos_sac: a.todos_sac == "S" ? "Sim" : "Nao",
        padrinho: a.padrinho == "S" ? "Sim" : "Nao",
      };
    });

    setCatechizingAll(p);
  };;

  const handleModalConfirm = (id) => {
    setModalConfirm({
      openOrClose: !modalConfirm.openOrClose,
      id: id,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCatequizando = async (id) => {
    const res = await deleteCatechizing(id);
    if (res.status) {
      console.log("ANTES", catechizingFilter);
      const newCatechizing = catechizingAll.filter((cat) => cat.id != id);
      // const newCatechizingFilter = catechizingFilter.filter((cat)=>cat.id!=id)
      console.log("DEPOIS", newCatechizing);
      setSearch("");
      setCatechizingFilter(newCatechizing);
      setCatechizingAll(newCatechizing);
      handleModalConfirm(!modalConfirm);
    } else {
      alert("Erro ao cadastrar usuario!");
    }
  };

  const renderTable = (catechizing) => {
    if (catechizing) {
      return (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: 5 }}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ height: 40 }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={Label}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {catechizing
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
                              {column.id == "action" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    margin: 1,
                                    paddingBottom: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
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
                                    onClick={() =>
                                      props.navTo(row.id, 8)
                                    } 
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
                                    onClick={() => handleModalConfirm(row.id)}
                                  >
                                    <Delete />
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
            count={catechizing.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  };

  return (
    <div>
      <ModalConfirm
        data={modalConfirm}
        closeModal={handleModalConfirm}
        afterFunction={deleteCatequizando}
        title="Tem certeza que deseja excluir ?"
      />
      <Header title="Catequizandos" />
      <div style={{ paddingLeft: 50 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 600, paddingTop: 10 }}>
            <Form style={{ display: "flex", alignItems: "center" }}>
              <Input
                name="text"
                placeholder="Pesquisar Nome"
                value={search}
                onChange={(event) => onChangeSearch(event.target.value)}
                style={{ marginLeft: 20 }}
              ></Input>
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

        {renderTable(search == "" ? catechizingAll : catechizingFilter)}
      </div>
    </div>
  );
}

const Label = {
  color: "#0d638f",
  fontSize: "14px",
  fontWeight: "bold",
};


export default Catechizing;
