const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    usersSchema = new Schema({
        id: {
            type: Number,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }),
    Users = mongoose.model('users', usersSchema)

module.exports = Users