import axios from "axios";

//Funções Relacionadas a integração com backend
const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

const createUsers = async (data) => {
  delete data.confirmSenha;
  delete data.turma;
  console.log(data);
  const s = JSON.parse(localStorage.getItem('loged'))
  console.log("TOKENN",api.defaults.headers["authorization"])

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
    .post("/login", userLogin)
    .then((res) => {
        console.log("RETORNO DO BACKEND: ",res)
        localStorage.setItem('loged',JSON.stringify({loged:res.data})) 
        
        localStorage.setItem('idUser',res.data.id_usuario)
        
        api.defaults.headers["authorization"] = `Bearer ${res.data.token}`
        
        return res.data
      
    
    })
    .catch((error) => console.log(error));
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

const deleteCatClasse = async (data) => {
  // const token = JSON.parse(localStorage.getItem("loged"));
  // console.log("TOKEN:", token.loged.token);
  // api.defaults.headers["authorization"] = `Bearer ${token.loged.token}`;

  return await api
    .delete("/turmaCatequista", {data:data})

    .then((a) => {
      return {
        status: 202 || 200,
        message: "Catequista excluido na turma com sucesso",
      };
    })
    .catch((error) => {
      console.log("API", data);
      console.log("Erro:", error);
      return {
        status: 500,
        message: error.response.data[0].errors,
      };
    });
};

const alterCatechizing = async (data, id) => {
  console.log(data);
  return await api
    .put(`/catequizando/${id}`, data)
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

const insertScraments = async (data, id) => {
  console.log("ID: ", id);
  console.log("DATA: ", data);
  const Eucaristia = data.filter((i) => i.tipo_sacramento == "E");
  const Admissao = data.filter((i) => i.tipo_sacramento == "A");
  const Batismo = data.filter((i) => i.tipo_sacramento == "B");
  const Crisma = data.filter((i) => i.tipo_sacramento == "C");
  console.log("Eucaristia", Eucaristia[0]);
  console.log("Admissao", Admissao[0]);
  console.log("Batismo", Batismo[0]);
  console.log("Crisma", Crisma[0]);

  Batismo[0] &&
    (await api
      .post(`/sacramento/100`, Batismo[0])
      .then((a) => console.log("DEU CERTO IRMAO:", "B"))
      .catch((error) =>
        console.log(
          "VISHHHHHHHHHH",
          Batismo[0].tipo_sacramento,
          error.response.data.message
        )
      ));
  Admissao[0] &&
    (await api
      .post(`/sacramento/100`, Admissao[0])
      .then((a) => console.log("DEU CERTO IRMAO:", "A"))
      .catch((error) =>
        console.log(
          "VISHHHHHHHHHH",
          Admissao[0].tipo_sacramento,
          error.response.data.message
        )
      ));
  try {
    Eucaristia[0] &&
      (await api
        .post(`/sacramento/100`, Eucaristia[0])
        .then((a) => console.log("DEU CERTO IRMAO:", "E"))
        .catch((error) =>
          console.log(
            "VISHHHHHHHHHH",
            Eucaristia[0].tipo_sacramento,
            error.response.data.message
          )
        ));
  } catch (error) {
    console.log(error);
  }
  Crisma[0] &&
    (await api
      .post(`/sacramento/100`, Crisma[0])
      .then((a) => console.log("DEU CERTO IRMAO:", "C"))
      .catch((error) =>
        console.log(
          "VISHHHHHHHHHH",
          Crisma[0].tipo_sacramento,
          error.response.data.message
        )
      ));
};
// await api.post(`/sacramento/${id}`,data).then((a)=>console.log("DEU CERTO IRMAO")).catch(()=>conosole.log("VISHHHHHHHHHH"))

const getOneClasse = async (id) => {
  return api(`/turma/${id}`)
    .then((item) => item.data)
    .catch(() => null);
};

const getClasseComplete = async (id) => {
  return api(`/turma/completo/${id}`)
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
  insertDocumentsCatechizing,
  getDocumentsCatechizing,
  insertCatechizingInTurma,
  getCatechizing,
  getOneCatechizing,
  deleteCatechizing,
  login,
  alterCatechizing,
  insertScraments,
  getOneClasse,
  updateClasse,
  getClasseComplete,
  deleteCatClasse,
};
