import React, { useState, useEffect } from "react";
import axios from "axios"
import TaskForm from "../components/taskfrom";
import TaskList from "../components/taskList";
import "./home.css"
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
        
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let userId = localStorage.getItem("userId")
        const response = await axios.get(`http://localhost:5000/getUser/${userId}`, {
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
    // return ()=>{
    //   localStorage.removeItem("token")
    // }
  }, []);

  const handleCreateTask = async (task, description, status) => {
    try {
      let userId = localStorage.getItem("userId")
      const response = await axios.post(`http://localhost:5000/createtask`, {
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
      const response = await axios.patch(`http://localhost:5000/updatetask/${taskId}`, updates, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTask = response.data;
   
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/deletetask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
      
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
