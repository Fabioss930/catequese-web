import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close'
import { getCatInClasse, getDocumentsCatechizing, getOneCatechizing, getOneUser, getSacramentsCatechizing, getUsers } from '../../../services/api';
import { ArrowDropDown, Article, Assignment, Delete, Expand, Label, People, PictureAsPdf } from '@mui/icons-material';
import Pdf from '@mui/icons-material/PictureAsPdf';
import './style.css'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import pdf from './exportPdf'





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: '#FFF',
  color: '#000',
  boderRadius: 20,
  boxShadow: 24,
  p: 4,

};




const columns = [

  { id: "nome", label: "Nome", minWidth: 100 },
  { id: "idade", label: "Idade", minWidth: 100, align: "center" },
  { id: "data_nascimento", label: "Data de Nasc", minWidth: 100, align: "center" },
  { id: "telefone_1", label: "Telefone", minWidth: 200, align: "center" },


  { id: "estado_civil", label: "Estado Civil", minWidth: 100, align: "center" },

  { id: "sexo", label: "Sexo", minWidth: 100, align: "center" },
  { id: "sac_concluidos", label: "Sac Concluidos", minWidth: 100, align: "center" },
  { id: "sac_emProcesso", label: "Sac em Processo", minWidth: 100, align: "center" },

];

export default function BasicModal(props) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const reinverterData = (data) => {
    if (data) {
      const date = new Date(data).toLocaleDateString()
      const arrayData = date.split("/")
      return `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
    } else {

      const date = new Date().toLocaleDateString()
      const arrayData = date.split("/")
      return `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
    }
  }

  console.log('Catequizandos:', props.data)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportarPdf = async () => {
    pdf(props.data)


}



  const renderTable = (catechizing) => {



    if (catechizing) {
      return (
        <>
          <Paper sx={{ width: "98%", overflow: "hidden", padding: 5 }}>
            <TableContainer sx={{ maxHeight: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow sx={{ height: 40 }}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ color: '#000' }}

                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catechizing

                    .map((row) => {
                      return (
                        <TableRow
                          style={{ height: 40, color: '#000' }}
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
                                style={{ color: "#000" }}

                              >
                                {value}

                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
                  

          </Paper>
          Total: {props.data.length}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 12 }} >
            <div id="pdf" onClick={() => exportarPdf()}>
              Exportar<Pdf style={{ color: 'red', marginLeft: 5 }} />

            </div>
          </div>
        </>
      );
    }
  };

  const render = () => {
    return (
      <Box sx={style}>

        <div onClick={() => props.closeModal()}>
          <Close fontSize='10' style={{ position: 'absolute', right: 5, top: 5, color: '#000' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {renderTable(props.data)}

        </div>
      </Box>
    )
  }

  return (
    <div>

      <Modal
        open={props?.openOrClose}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        {render()}
      </Modal>
    </div>
  );


}
