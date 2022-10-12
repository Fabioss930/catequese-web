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

const getOneUser = async (id) => {

  return api(`/usuario/${id}`).then((item) => item.data).catch(() => null)
}

const login = async (userLogin) => {
  console.log(userLogin)

  return await api
    .post("/usuario/login", userLogin)
    .then((a) => a.data)
    .catch((error) => null);
}



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
  console.log("O que foi para api:",data)
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

const createCatechizing = async (data) => {
  console.log(data)
  return await api
    .post("/catequizando", data)
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
      };
    })
    .catch((error) => {
      console.log(error)
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });

}

const getCatechizing = async () => {

  try {
    return await api("/catequizando")
      .then((a) => a.data)
      .catch((error) => console.log("Erro pegar usuarios", error));
  } catch (error) {
    console.log("ERRO");
  }

}
const getOneCatechizing = async (id) => {

  return api(`/catequizando/${id}`).then((item) => item.data).catch(() => null)
}

const deleteCatechizing = async (id) => {
  try {
    return api.delete(`/catequizando/${id}`).then((a) => a).catch((error) => error)
  } catch (error) {
    alert('Erro ao deletar usuario verifique sua conexao!')
  }
  

}
const deleteUser = async (id) => {
  return api.delete(`/usuario/${id}`).then((a) => a).catch((error) => console.log(error))

}

const deleteClasse = async (id) => {
  return api
    .delete(`/turma/${id}`)
    .then((a) => a)
    .catch((error) => console.log(error));
};

const alterCatechizing = async (data) => {
  console.log(data);
  return await api
    .post("/catequizando", data)
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });
};

const updateClasse = async (data, id) => {
  console.log(data);
  return await api
    .put(`/turma/${id}`, data)
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });
};



const getOneClasse = async (id) => {
  return api(`/turma/${id}`)
    .then((item) => item.data)
    .catch(() => null);
};

const documents = async (documents, id) => {
  return await api
    .post("/documentos")
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });
};

export {
  createUsers,
  getUsers,
  getOneUser,
  deleteUser,
  getClasses,
  deleteClasse,
  classeCatechizing,
  api,
  createCatechizing,
  getCatechizing,
  getOneCatechizing,
  deleteCatechizing,
  login,
  alterCatechizing,
  getOneClasse,
  updateClasse,
};