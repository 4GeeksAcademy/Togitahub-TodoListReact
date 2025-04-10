import { useEffect, useState } from "react";
import TaskFooter from "./TaskFooter";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const checkAndCreateUser = async () => {
			const username = "oscar";
			try {
				const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
				if (response.ok) {
					console.log(`El usuario '${username}' ya existe.`);
				} else if (response.status === 404) {
					const createResponse = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({}),
					});
					if (createResponse.ok) {
						console.log(`Usuario '${username}' creado exitosamente.`);
					} else {
						console.error(`Error al crear el usuario '${username}': ${createResponse.statusText}`);
					}
				} else {
					console.error(`Error al verificar el usuario '${username}': ${response.statusText}`);
				}
			} catch (error) {
				console.error(`Error en la solicitud: ${error.message}`);
			}
		};

		checkAndCreateUser();
	}, []);

	async function showOscarsTasks() {
		try {
			const respuesta = await fetch(
				"https://playground.4geeks.com/todo/users/oscar"
			);

			if (!respuesta.ok) {
				throw new Error(`Error: ${respuesta.status}`);
			}

			const tasks = await respuesta.json();
			setTasks(tasks.todos);
		} catch (error) {
			console.error("Error al obtener tareas:", error);
		}
	}

	useEffect(() => {
		showOscarsTasks();
	}, []);

	const addTask = async (task) => {
		try {
			const response = await fetch(
				"https://playground.4geeks.com/todo/todos/oscar",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ label: task, is_done: false }),
				}
			);

			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}
			showOscarsTasks(); // Recargar las tareas desde la API
		} catch (error) {
			console.error("Error al agregar tarea:", error);
		}
	};

	const removeTask = async (todoId) => {
		try {
			const response = await fetch(
				`https://playground.4geeks.com/todo/todos/${todoId}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}

			showOscarsTasks();
		} catch (error) {
			console.error("Error al eliminar tarea:", error);
		}
	};

	const removeAllTasks = async () => {
		try {
			// Eliminar cada tarea individualmente de la API
			for (const task of tasks) {
				await removeTask(task.id);
			}
			showOscarsTasks(); // Actualizar el estado local después de eliminar todas las tareas
		} catch (error) {
			console.error("Error al eliminar todas las tareas:", error);
		}
	};

	return (
		<div className="d-flex flex-column align-items-center p-5">
			<h1>Lista de Tareas</h1>
			<TaskInput addTask={addTask} />
			<TaskList tasks={tasks} removeTask={removeTask} />
			<TaskFooter taskCount={tasks.length} />
			<button onClick={removeAllTasks} className="btn btn-danger mt-3">
				Eliminar todas las tareas
			</button>
		</div>
	);
}

export default App;