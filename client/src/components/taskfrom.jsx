import React, { useState } from "react";


function TaskForm({ onCreateTask }) {
  const [task, setTasks] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask(task, description, status);
    setTasks("");
    setDescription("");
    setStatus("");
    window.location.reload()
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="task"
        value={task}
        onChange={(e) => setTasks(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select status</option>
        <option value="pending">Pending</option>
        <option value="in Progress">In Progress</option>
        <option value="done">Done</option>
        <option value="completed">completed</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm