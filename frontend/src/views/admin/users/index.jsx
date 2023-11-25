import React, { useState } from 'react';
import axios from '../../../utils/axios_instance';
import './styles.css';

export default function Users(){
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [data, setData] = useState([]);

  async function handleRequest() {
    try {
      const response = await axios.get('/users/');
      setData(response.data)
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
      <button onClick={handleRequest}>Retornar dados</button>
      <ul>
        <h1>{data.map(el => (
          <>
            <li>{el.username}</li>
            <li>{el.email}</li>
          </>
        ))}</h1>
      </ul>
    </>
    
  )
}