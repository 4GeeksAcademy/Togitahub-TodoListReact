import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskFooter from "./TaskFooter";
import TaskInput from "./TaskInput";

const App = () => {
	const [tasks, setTasks] = useState(['Hacer la cama', 'Lavarse los dientes', 'Desayunar']);

	const addTask = (task) => {
		setTasks([...tasks, task.trim()]);
	};

	const removeTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};

	return (
		<div className="d-flex flex-column align-items-center p-5">
			<h1>Lista de Tareas</h1>
			<TaskInput addTask={addTask} />
			<TaskList tasks={tasks} removeTask={removeTask} />
			<TaskFooter taskCount={tasks.length} />
		</div>
	);
};

export default App;
