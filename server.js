// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/simple-mern-stack', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple schema (e.g., Task)
const taskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model('Task', taskSchema);

// API endpoints
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text });
  await task.save();
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
