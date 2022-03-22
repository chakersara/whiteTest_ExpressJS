const mongoose = require('mongoose')
const Joi = require('joi')

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    },
    role: {
        type: String,
        required: true
    }
})

let validation_user = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(
        new RegExp('^[a-zA-Z0-9]{3,30}$')
    ).required(),
    re_password: Joi.ref('password'),
    role: Joi.string().required()
})

let validation_login = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

let User = mongoose.model("User", user_schema)

module.exports.User = User;
module.exports.validation_user = validation_user;
module.exports.validation_login = validation_login;