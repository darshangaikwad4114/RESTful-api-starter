const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;


