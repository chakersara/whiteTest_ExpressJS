const Joi = require('joi')
const mongoose = require('mongoose')
Joi.objectId = require('joi-objectid')(Joi)

const wt_schema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    questions: [{
        question_title: {
            type: String,
            required: true,
            minlength: 10
        },
        responses: [{
            option: String,
            isCorrect: {
                type: Boolean,
                default: false,
                required: () => {
                    return this.option
                }
            }
        }]
    }],
    dates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Date'

    }]
})

let wt_validation = Joi.object({
    nom: Joi.string().required(),
    questions: Joi.array().min(2).required().items(Joi.object({
            question_title: Joi.string().required(),
            responses: Joi.array().min(2).required().items(Joi.object({
                option: Joi.string(),
                isCorrect: Joi.boolean()
            }))
        })),
    dates: Joi.array().items(Joi.objectId())
})

let add_question_validation=Joi.object({
    question_title: Joi.string().required(),
    responses: Joi.array().min(2).required().items(Joi.object({
        option: Joi.string(),
        isCorrect: Joi.boolean()
    }))
})


const White_test = mongoose.model("White_test", wt_schema)

module.exports.White_test = White_test
module.exports.wt_validation = wt_validation
module.exports.add_question_validation=add_question_validation