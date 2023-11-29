import React, {useState, useEffect} from 'react';
import axios from '../../../utils/axios_instance';
import "./styles.css";
import userType from "../../../util/UserType";

export default function Tasks () {
    const [data, setData] = useState([]);
	const [permissionDenied, setPermissionDenied] = useState(false);
    
	useEffect(() => {
		async function fetch() {
			try {
				const response = await axios.get('/tasks/');
				setData(response.data);
			} catch(error) {
				if (error.response) {
					if (error.response.status === 403)
						setPermissionDenied(true);
					alert('Ocorreu um erro: ' + error);
				}
			}
		}
		fetch();
	}, [])

	async function addTask(e){
		e.preventDefault();

		let data = Object.fromEntries(new FormData(e.target));
		data.responsible = parseInt(data.responsible);

		try {
			const response = await axios.post("/createTask/", data);
		} catch(error) {
			alert("Ocorreu um erro: " + error)
		}
	}

	async function editTask(id){
		window.location.href = `http://localhost:3000/admin/tarefas/editar?id=${id}`;
	}

		async function deleteTask(id) {
			try {
				const response = await axios.delete(`/deleteTask/${id}/`);
				window.location.reload();
			} catch (error) {
				alert('Ocorreu um erro: ' + error);
				console.log(error)
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

    return (
        <div>
			<div className="modal fade" id="addTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
				 aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Formulário</h4>
						</div>
						<div className="modal-body">
							<form onSubmit={addTask}>
								<div className="form-group">
									<label htmlFor="description">Descrição:</label>
									<input type="text" className="form-control" id="description" name="description"
										   required />
								</div>
								<div className="form-group">
									<label htmlFor="status">Status:</label>
									<select className="form-control" id="status" name="status" required>
										<option value="Pronta">Pronta</option>
										<option value="Pendente" selected>Pendente</option>
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="approval_status">Status:</label>
									<select className="form-control" id="approval_status" name="approval_status" required>
										<option value="Aprovada">Aprovada</option>
										<option value="Rejeitada">Rejeitada</option>
										<option value="Nao Avaliada" selected>Não Avaliada</option>
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="responsible">Responsável (Número):</label>
									<input type="number" className="form-control" id="responsible" name="responsible"
										   required />
								</div>
								<button type="submit" className="btn btn-primary">Enviar</button>
							</form>
						</div>
					</div>
				</div>
			</div>

			{userType.isManager() &&
				<header className={"d-flex justify-content-end"}>
					<button type="button" className="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#addTaskModal">
						Adicionar Tarefa
					</button>
				</header>
			}

            <table className="table text-center mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Status</th>
                        <th scope="col">Status de aprovação</th>
                        <th scope="col">Responsável</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
					{data.map((el, index) => (
						<tr key={index}>
							<th scope="row"> {el.id}</th>
							<td>{el.description}</td>
							<td>{el.status}</td>
							<td>{el.approval_status}</td>
							<td>{el.responsible}</td>
							<td>
								<div className={"d-flex justify-content-around"}>
									<button type={"button"} className={`btn btn-primary w-auto edit-${index + 1}`} onClick={() => {editTask(index + 1)}}>
										<i className="bi bi-pencil-square action-icon"></i>
									</button>
									<button type={"button"} className={`btn btn-primary w-auto delete-${index + 1}`} onClick={() => {deleteTask(index + 1)}}>
										<i className="bi bi-x action-icon"></i>
									</button>
								</div>
							</td>
						</tr>
					))}
                </tbody>
            </table>
        </div>
    );
}