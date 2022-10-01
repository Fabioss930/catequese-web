import axios from "axios";
//Funções Relacionadas a integração com backend
const api = axios.create({
    baseURL: 'http://localhost:3003/api'
})


const getUsers = async ()=>{
    try {
        
        return await api('/usuario').then((a)=>a.data).catch(error=>console.log('Erro pegar usuarios', error))
    } catch (error) {
        console.log('ERRo')
    }
    
}

const createUsers = async (data) => {
    delete data.confirmSenha
    delete data.turma
    console.log(data)

    return await api.post('/usuario', data)
    .then(a => {
        return {
            status: 202, message: 'Usuario cadastrado'}

    }).catch(error => {
        return {
         status: 500, message: error.response.data[0].errors }
        })

}

export { createUsers, getUsers }