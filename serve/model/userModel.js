const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema, model } = mongoose

const userSchema = new Schema({
    avatar: { type: String, require: false, default: "http://localhost:5000/avatar/default.jpeg" },
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: {
        type: String, require: true, set(val) {
            return bcrypt.hashSync(val, 10)
        }
    }
}, { versionKey: false })



const User = model('User', userSchema);

module.exports = User