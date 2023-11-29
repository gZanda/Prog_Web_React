import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios_instance';
import './styles.css';

export default function Users(){
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/users/');
                setData(response.data)
            } catch(error) {
                alert("Ocorreu um erro: " + error)
            }
        }
        fetchUsers();
    }, [])

    async function deleteUser(id){
        try {
            const response = await axios.delete(`/deleteUser/${id}/`);
            window.location.reload();
        } catch(error) {
            alert("Ocorreu um erro: " + error)
        }
    }

    if (permissionDenied) {
        return(
            <>
                <h1> PERMISSÃO NEGADA</h1>
                <b> Essa funcionalidade requer o cargo de manager </b>
            </>
        )
    }

    return(
        <div>
            <table className="table text-center mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuário</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el, index) => (
                        <tr key={index}>
                            <th scope="row"> {el.id}</th>
                            <td>{el.username}</td>
                            <td>{el.email}</td>
                            <td>
                                <div className={"d-flex justify-content-around"}>
                                    <button type={"button"} className={"btn btn-primary w-auto"} onClick={() => {deleteUser(index + 1)}}>
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