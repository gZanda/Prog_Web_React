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
            } catch(error) {
                if (error.response) {
                    if (error.response.status === 403)
                        setPermissionDenied(true);
                    alert("Ocorreu um erro: " + error)
                }
            }
        }
        fetchUsers();
    }, [])

    //pega um usuário a partir do id de um input *ESTILIZAR*
    async function getUser(){
        try {
            const response = await axios.get(`/users/${idUser}/`);
            setData([response.data])
        } catch(error) {
            if (error.response.status === 403)
                setPermissionDenied(true);
            alert("Ocorreu um erro: " + error)
        }
    }

    //deleta um usuário a partir do id *ESTILIZAR e fazer o delete por um botão 'X' talvez? *
    async function deleteUser(id){
        try {
            const response = await axios.delete(`/deleteUser/${id}/`);
        } catch(error) {
            if (error.response.status === 403)
                setPermissionDenied(true);
            alert("Ocorreu um erro: " + error)
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
        <div>
            {/*<header className={"d-flex justify-content-end"}>*/}
            {/*    <input type={"button"} className={"btn btn-primary add-btn"} onClick={""} value={"Adicionar Tarefa"} />*/}
            {/*</header>*/}
            <table className="table text-center">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuário</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ações</th>
                </tr>
                </thead>
                <tbody>
                {data.map(el => (
                    <tr>
                        <th scope="row"> {el.id}</th>
                        <td>{el.username}</td>
                        <td>{el.email}</td>
                        <td>
                            <div className={"d-flex justify-content-around"}>
                                <button type={"button"} className={"btn btn-primary w-auto"} onClick={deleteUser(el.id)}>
                                    <i class="bi bi-x action-icon"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}