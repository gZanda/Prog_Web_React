import React, {useState, useEffect} from 'react';
import axios from '../../../utils/axios_instance';
import "./styles.css";

export default function Tasks () {
    const [data, setData] = useState([]);
	const [idTask, setIdTask] = useState();
	const [permissionDenied, setPermissionDenied] = useState(false);
    
	// Faz a request toda vez que o componente é renderizado em tela (Primeira vez que abre a página ou cada vez que atualiza a pagina)
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
	}, [Tasks])

		// função para retornar uma task apartir do seu ID *ESTILIZAR*
		async function retrieveTask(){
			try{
				const response = await axios.get(`/tasks/${idTask}/`);
				setData([response.data])
			}catch(error){
				if (error.response.status === 403)
					setPermissionDenied(true);
				alert('Ocorreu um erro: ' + error);
				console.log(error)
			}
		}

		async function addTask(e){
			e.preventDefault();

			let data = Object.fromEntries(new FormData(e.target));
			data['status'] = "Pendente"
			data['approval_status'] = "Não avaliado"

			try {
				const response = await axios.post("/createTask/", data);
				console.log(response.data)
			} catch(error) {
				if(error.response.status === 403)
					setPermissionDenied(true);
				alert("Ocorreu um erro: " + error)
			} finally {
				fetch()
			}
		}

		//função para editar task (os dados estão estáticos, tem que mudar o objeto mandado na requisição pros dados do formulário)*ESTILIZAR*
		async function editTask(id){
			try {
				const response = await axios.put(
				`/editTask/${id}/`,
				{
					"description":"Task editada!",
					"status":"Pendente",
					"approval_status":"Não Avaliada",
					"responsible": 2
				});
				setData([response.data])
			} catch(error) {
				if (error.response.status === 403)
					setPermissionDenied(true);
				alert('Ocorreu um erro: ' + error);
				console.log(error)
			}
		}

		//função para deletar task *ESTILIZAR com um botão 'X'* 
		async function deleteTask(id){
			try {
				const response = await axios.delete(`/deleteTask/${id}/`);
				setData([response.data])
			} catch(error) {
				if (error.response.status === 403)
					setPermissionDenied(true);
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

			<header className={"d-flex justify-content-end"}>
				<button type="button" className="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#addTaskModal">
					Adicionar Tarefa
				</button>
			</header>
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
					{data.map(el => (
						<tr>
							<th scope="row"> {el.id}</th>
							<td>{el.description}</td>
							<td>{el.status}</td>
							<td>{el.approval_status}</td>
							<td>{el.responsible}</td>
							<td>
								<div className={"d-flex justify-content-around"}>
									<button type={"button"} className={"btn btn-primary w-auto"} onClick={editTask(el.id)}>
										<i className="bi bi-pencil-square action-icon"></i>
									</button>
									<button type={"button"} className={"btn btn-primary w-auto"} onClick={deleteTask(el.id)}>
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