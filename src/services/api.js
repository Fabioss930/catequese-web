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
    .then((res) => {
            
        localStorage.setItem('loged',JSON.stringify({loged:res.data})) 
        localStorage.setItem('idUser',res.data.tokenCatequese.id)
        
        api.defaults.headers.common["Authorization"] = res.data
        
        return res.data
      
    
    })
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
        id:a.data.id
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

const insertDocumentsCatechizing = async(data,id)=>{
  console.log("ID:",id)
  return await api
    .post(`/documentos/${id}`, data)
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
        id:a.data.id
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

const insertCatechizingInTurma = async(data)=>{
  console.log("IdCat:",data.idCat)
  console.log("IdTurma:",data.idTurma)
  return await api
    .post(`/turmaCatequizando/`, {turmaId:data.idTurma, catequizandosId:[data.idCat]})
    .then((a) => {
      return {
        status: 202,
        message: "Usuario cadastrado",
        id:a.data.id
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

const getDocumentsCatechizing = async(id)=>{
  return api(`/documentos/catequizando/${id}`).then((item) => item.data).catch(() => null)


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


const alterCatechizing = async (data,id) => {

  console.log(data)
  return await api
    .put(`/catequizando/${id}`, data)
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



export {
  createUsers,
  getUsers, getOneUser,
  deleteUser,
  getClasses,
  deleteClasse,
  classeCatechizing,
  api,
  createCatechizing,
  insertDocumentsCatechizing,
  getDocumentsCatechizing,
  insertCatechizingInTurma,
  getCatechizing,
  getOneCatechizing,
  deleteCatechizing,
  login,
  alterCatechizing,

};