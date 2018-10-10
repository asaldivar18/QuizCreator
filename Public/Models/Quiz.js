const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const QuizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    difficulty: {
        type: String
    },
    answer: {
        type: String
    },
    answers: {
        type: []
    },

})

module.exports = Quiz = mongoose.model('Quiz', QuizSchema)