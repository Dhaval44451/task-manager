const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware (Helper tools)
app.use(cors());
app.use(express.json()); // Allows our server to read JSON text sent by React

// Connect to MongoDB using the secret link in your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully! 🎉"))
  .catch(err => console.log("Database Connection Error: ", err));

// Define Database Structure (What does a Task look like?)
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }
});
const Task = mongoose.model('Task', TaskSchema);

// --- API Routes (The routes our frontend can use) ---

// Route 1: Get all tasks from the database
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route 2: Save a new task to the database
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route 3: Delete a task from the database by its ID
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Task deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route 4: Update a task by its ID
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server and listen on Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running smoothly on port ${PORT}`));