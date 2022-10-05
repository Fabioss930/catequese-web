import axios from "axios";
//Funções Relacionadas a integração com backend
const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

const createUsers = async (data) => {
  delete data.confirmSenha;
  delete data.turma;
  console.log(data);

  return await api
    .post("/usuario", data)
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
      };
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });
};

const getUsers = async () => {
  try {
    return await api("/usuario")
      .then((a) => a.data)
      .catch((error) => console.log("Erro pegar usuarios", error));
  } catch (error) {
    console.log("ERRO");
  }
};

const getClasses = async () => {
  try {
    return await api("/turma")
      .then((a) => a.data)
      .catch((error) => console.log("Erro", error));
  } catch (error) {
    console.log("ERRO");
  }
};

const classeCatechizing = async (data) => {
  return await api
    .post("/turmaCatequista", data)
    .then((response) => response.data)
    .then((a) => {
      return {
        data,
        status: 200 || 202,
        message: "Catequista cadastrado na turma com sucesso",
      };
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });
};

export { createUsers, getUsers, getClasses, classeCatechizing, api };