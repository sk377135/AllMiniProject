// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Todo schema and model
const todoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

// Set up routes
app.get("/api/todo_app", async (req, res) => {
  try {
    const todo_app = await Todo.find();
    res.json(todo_app);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/todo_app", async (req, res) => {
  try {
    const { task } = req.body;
    const todo_app = new Todo({ task });
    await todo_app.save();
    res.json(todo_app);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
