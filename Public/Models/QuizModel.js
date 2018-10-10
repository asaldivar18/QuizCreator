var QuizModel = function() {
    this.questions = [];
    this.addQuestionEvent = new Event(this);
    this.finishQuizEvent = new Event(this);
    this.resetQuizEvent = new Event(this);
};

QuizModel.prototype = {

    /**
     * Add question to array
     */
    addQuestion: function(question) {
        this.questions.push(question);
        this.addQuestionEvent.notify();
    },

    /**
     * Returns questions
     */
    getQuestions: function() {
        return this.questions;
    },

    /**
     * Removes question at index
     */
    removeQuestion: function(i) {
        if (i > -1) {
            this.questions.splice(i, 1);
        }
        console.log(this.questions)
    },

    /**
     * Clears questions
     */
    resetQuiz: function() {
        this.questions = []
    }




}