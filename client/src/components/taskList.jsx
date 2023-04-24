

import React from "react";
import "./tasklist.css"

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
          <li key={task.id}>
          <h2>{task.task}</h2>
          <p>{task.description}</p>
          <p>Current-Status: {task.status}</p>
          <div>
          <button onClick={() => onUpdateTask(task.id, { status: "done" })}>
           Done
          </button>
          <button onClick={() => onUpdateTask(task.id, { status: "in Progress" })}>
            Move to In Progress
          </button>
          <button onClick={() => onUpdateTask(task.id, { status: "pending" })}>
            Move to Pending
          </button>
          <button onClick={() => onUpdateTask(task.id, { status: "completed" })}>
            Move to Completed
          </button>
          <button style={{backgroundColor:"red"}} onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  
  );
}

  

export default TaskList;
