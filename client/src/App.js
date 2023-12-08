// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the server
    axios.get('http://localhost:5000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTask = () => {
    // Add a new task to the server
    axios.post('http://localhost:5000/api/tasks', { text: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch((error) => console.error(error));
  };

  const deleteTask = (id) => {
    // Delete a task from the server
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Simple MERN Stack To-Do App</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
