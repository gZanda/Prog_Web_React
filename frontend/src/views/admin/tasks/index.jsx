import React, {useState, useEffect} from 'react';
import axios from '../../../utils/axios_instance';

export default function Tasks () {
    const [data, setData] = useState([]);
		const [idTask, setIdTask] = useState();
		const [permissionDenied, setPermissionDenied] = useState(false);
    
		// Faz a request toda vez que o componente é renderizado em tela (Primeira vez que abre a página ou cada vez que atualiza a pagina)
		useEffect(() =>{
			async function fetch() {
				try{
					const response = await axios.get('/tasks/')
					setData(response.data)
					console.log(data)
				}catch(error){
					if (error.response.status === 403) setPermissionDenied(true);
					alert('Ocorreu um erro:', error);
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
				if (error.response.status === 403) permissionDenied(true);
				alert('Ocorreu um erro: ', error);
				console.log(error)
			}
		}

		//função para criar task (os dados estão estáticos, tem que mudar o objeto mandado na requisição pros dados do formulário) *ESTILIZAR E ABRIR FORMULÁRIO (MODAL?)* 
		async function addTask(){
			try{
				const response = await axios.post("/createTask/", 
					{
						"description":"Fazer Trabalho",
						"status":"Pendente",
						"approval_status":"Não Avaliada",
						"responsible": 1
					}
					)
				console.log(response.data)
			}catch(error){
				if(error.response.status === 403) setPermissionDenied(true);
				alert("Ocorreu um erro: ", error)
			}
		}
		//função para editar task (os dados estão estáticos, tem que mudar o objeto mandado na requisição pros dados do formulário)*ESTILIZAR*
		async function editTask(){
			try{
				const response = await axios.put(`/editTask/${idTask}/`, 
				{
					"description":"Task editada!",
					"status":"Pendente",
					"approval_status":"Não Avaliada",
					"responsible": 2
				}
				);
				setData([response.data])
			}catch(error){
				if (error.response.status === 403) permissionDenied(true);
				alert('Ocorreu um erro: ', error);
				console.log(error)
			}
		}

		//função para deletar task *ESTILIZAR com um botão 'X'* 
		async function deleteTask(){
			try{
				const response = await axios.delete(`/deleteTask/${idTask}/`);
				setData([response.data])
			}catch(error){
				if (error.response.status === 403) permissionDenied(true);
				alert('Ocorreu um erro: ', error);
				console.log(error)
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

    return (
        <div>
            <button className={"py-2 mb-4 px-4 border rounded-md text-white bg-blue-600"} onClick={addTask}>
                Add record
            </button>

						<input type="number" name="id_task" onChange={(e) => setIdTask(e.target.value)}/>
						<button onClick={retrieveTask} > Retornar Task </button>

						<input type="number" name="id_task" onChange={(e) => setIdTask(e.target.value)}/>
						<button onClick={deleteTask} > Deletar Task </button>
						
						<input type="number" name="id_task" onChange={(e) => setIdTask(e.target.value)}/>
						<button onClick={editTask} > Editar Task </button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Status</th>
                        <th scope="col">Status de aprovação</th>
                        <th scope="col">Responsável</th>
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
										</tr>
									))}
                </tbody>
            </table>
        </div>
    );
}