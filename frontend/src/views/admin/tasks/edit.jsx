import React, {useState, useEffect} from 'react';
import axios from '../../../utils/axios_instance';
import "./edit.styles.css";
import UserType from "../../../util/UserType";

export default function EditTask () {
    const [task, setTask] = useState({});

    useEffect(() => {
        const param = new URLSearchParams(window.location.search).get('id');
        if (param) {
            (
                async function retrieveTask(){
                	try {
                		const response = await axios.get(`/tasks/${param}/`);
                        setTask(response.data);
                	} catch(error) {
                		alert('Ocorreu um erro: ' + error);
                		console.log(error)
                	}
                }
            )()
        }
    }, [])


    async function handleEdit(e) {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

        try {
            const response = await axios.put(
                `/editTask/${task.id}/`, task);
            window.location.href = "http://localhost:3000/admin/tarefas"
        } catch (error) {
            alert('Ocorreu um erro: ' + error);
            console.log(error)
        }
    }

    return (
        <div className="container mt-4">
            <form onSubmit={handleEdit}>
                <div className="form-group">
                    <label htmlFor="description">Descrição:</label>
                    <input value={task.description} type="text" className="form-control" id="description" name="description" required />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select className="form-control" id="status" name="status" required>
                        <option value="Pronta">Pronta</option>
                        <option value="Pendente">Pendente</option>
                    </select>
                </div>

                { UserType.isManager() &&
                    <>
                        <div className="form-group">
                            <label htmlFor="approval_status">Status de aprovação:</label>
                            <select className="form-control" id="approval_status" name="approval_status" required>
                                <option value="Aprovada">Aprovada</option>
                                <option value="Rejeitada">Rejeitada</option>
                                <option value="Nao Avaliada">Não Avaliada</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="responsible">Responsável (id):</label>
                            <input value={task.responsible} type="number" className="form-control" id="responsible" name="responsible" required />
                        </div>
                    </>
                }

                <div className={"d-flex justify-content-end"}>
                    <button type="submit" className="btn btn-primary" style={{width: 150}}>Salvar</button>
                </div>
            </form>
        </div>
    );
}