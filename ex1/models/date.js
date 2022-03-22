const Joi = require('joi')
const mongoose = require('mongoose')


const date_schema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true,

    },
    wt: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'White_test'
    }]
})

let date_validation = Joi.object({
    date: Joi.string().pattern(
        new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]')
    )
})

const Date = mongoose.model("Date", date_schema)

module.exports.Date = Date
module.exports.date_validation = date_validation