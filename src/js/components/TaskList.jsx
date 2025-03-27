export const TaskList = ({ tasks, removeTask }) => {
    return (
        <ul className="w-control list-group">
            {tasks.map((task, index) => (
                <li
                    key={index}
                    className="task-item list-group-item py-3 d-flex justify-content-between"
                >
                    {task.label}
                    <span
                        onClick={() => {
                            removeTask(task.id);
                        }}
                        className="text-danger task-delete-icon"
                    >
                        ⛔
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
