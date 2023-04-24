import React, { useState, useEffect } from "react";
import axios from "axios"
import TaskForm from "../components/taskfrom";
import TaskList from "../components/taskList";
import "./home.css"
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
        let userId = localStorage.getItem("userId")
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://euphonious-youtiao-09404f.netlify.app/getUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [userId]);

  const handleCreateTask = async (task, description, status) => {
    try {
      let userId = localStorage.getItem("userId")
      const response = await axios.post(`https://euphonious-youtiao-09404f.netlify.app/createtask`, {
        task,
        description,
        status,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await axios.patch(`https://euphonious-youtiao-09404f.netlify.app/updatetask/${taskId}`, updates, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTask = response.data;
      console.log(updatedTask,taskId , updates)
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://euphonious-youtiao-09404f.netlify.app/deletetask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  return (
  
    <div className="all">
      <h1>Todo List</h1>
      <TaskForm onCreateTask={handleCreateTask} />
      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      <div><button onClick={()=> localStorage.removeItem("token")}><Link to="/login">Logout</Link></button></div>
     
    </div>
    
 
  );
}

export default Home;
