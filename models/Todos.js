const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    todosSchema = new Schema({
        id: {
            type: Number,
            required: true
        },
        userId: {
            type: Number,
            required: true
        },
        todos: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }),
    Todos = mongoose.model('todos', todosSchema)

module.exports = Todos