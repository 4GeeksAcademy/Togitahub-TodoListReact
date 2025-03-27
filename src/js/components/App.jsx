import { useEffect, useState } from "react";
import TaskFooter from "./TaskFooter";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function App() {
	const [tasks, setTasks] = useState([]);

	// async function addNewUser(newUser) {
	// 	try {
	// 		const response = await fetch(
	// 			`https://playground.4geeks.com/todo/users/${newUser}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(),
	// 			}
	// 		);
	// 		if (!response.ok) {
	// 			throw new Error(`Error: ${response.status}`);
	// 		}
	// 		const user = await response.json();
	// 		console.log(`Se creo el usuario ${user} con exito`);
	// 	} catch (error) {
	// 		console.error("Error al agregar el usuario", error);
	// 	}
	// }

	// addNewUser("oscar");

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