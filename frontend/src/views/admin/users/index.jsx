import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios_instance';
import './styles.css';

export default function Users(){
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [data, setData] = useState([]);
  const [idUser, setIdUser] = useState();

  
  // Faz a request toda vez que o componente é renderizado em tela (Primeira vez que abre a página ou cada vez que atualiza a pagina) *ESTILIZAR*
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/users/');
        setData(response.data)
      }catch(error){
        if (error.response.status === 403) setPermissionDenied(true);
        alert("Ocorreu um erro:", error)
      }
    }
    fetchUsers();
  }, [])

  //pega um usuário a partir do id de um input *ESTILIZAR*
  async function getUser(){
    try {
      const response = await axios.get(`/users/${idUser}/`);
      setData([response.data])
    }catch(error){
      if (error.response.status === 403) setPermissionDenied(true);
      alert("Ocorreu um erro:", error)
    }
  }

  //deleta um usuário a partir do id *ESTILIZAR e fazer o delete por um botão 'X' talvez? *
  async function deleteUser(){
    try {
      const response = await axios.delete(`/deleteUser/${idUser}/`);
    }catch(error){
      if (error.response.status === 403) setPermissionDenied(true);
      alert("Ocorreu um erro:", error)
    }
  }

  if (permissionDenied){
    return(
      <>
        <h1> PERMISSÃO NEGADA</h1>
        <b> Essa funcionalidade requer o cargo de manager </b>
      </> 
    )
  }

  // Esse return é para retornar os dados do usuário
  return(
    <>
      <h1>RETORNA OS DADOS DE USUÁRIOS AQUI</h1>
      
      <input type="number" name="id_usuarios" onChange={(e) => setIdUser(e.target.value)}/>
      <button onClick={getUser}>Retornar usuário</button>

      <input type="number" name="delete_usuarios" onChange={(e) => setIdUser(e.target.value)}/>
      <button onClick={deleteUser}>Deletar um usuário por id</button>

      <ul>
        {data.map(el => (
          <>
            <li>{el.username}</li>
            <li>{el.email}</li>
          </>
        ))}
      </ul>
    </>
    
  )
}