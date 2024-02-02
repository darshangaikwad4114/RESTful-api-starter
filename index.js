const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./model/todo");

// Load environment variables from .env file
require("dotenv").config();

// Create an Express application
const app = express();
const port = 3001;

//middleware provided by Express to parse incoming JSON requests.
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB is connected!");
});

// Create an todo item
app.post("/todos/create", async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Read all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a todo by ID
app.put("/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server on port 3001
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});