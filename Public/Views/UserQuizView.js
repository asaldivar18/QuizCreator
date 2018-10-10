var QuizView = function(model) {
    this.model = model;
    this.count = 0;
    this.submitQuizEvent = new Event(this);
    this.init();
    this.questions = [];
};

QuizView.prototype = {
    init: function() {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function() {
        // cache the document object
        this.$container = $('.js-container');
        this.$questionsContainer = this.$container.find(".js-question-container")
        this.$submitQuizButton = this.$container.find('#sub');

        this.retrieveQuiz();
        console.log(this.model.questions)

        return this;
    },
    setupHandlers: function() {
        this.submitQuizButtonHandler = this.submitQuestions.bind(this)

        /**
        Handlers from Event Dispatcher
        */
        this.submitQuestionHandler = this.submitQuestions.bind(this);
        return this;
    },

    enable: function() {
        this.$submitQuizButton.click(this.submitQuizButtonHandler)
        $("#easy").click(a => {
            this.questions = [];
            for (var i = 0; i < this.model.questions.length; i++) {
                if (this.model.questions[i].difficulty == "easy") {
                    this.questions.push(this.model.questions[i]);
                    this.model.questions = this.questions;
                    this.displayQuiz();
                }
                //$("#")
            }
        })
        $("#hard").click(a => {
            this.questions = [];
            for (var i = 0; i < this.model.questions.length; i++) {
                if (this.model.questions[i].difficulty == "hard") {
                    this.questions.push(this.model.questions[i]);
                    this.model.questions = this.questions;
                    this.displayQuiz();
                }
            }
        })
        return this;
    },

    /**
     * Submit question and get score
     */
    submitQuestions: function() {
        var score = 0;
        var qs = this.model.questions;
        for (var i = 0; i < qs.length; i++) {
            var radios = document.getElementsByName("rad" + (i + 1))
            var answer = $("input:radio[name=rad" + (i + 1) + "]:checked").val();
            for (var j = 0; j < radios.length; j++) {
                let currentRadio = radios[j];
                currentRadio.disabled = true;
                if (currentRadio.checked && currentRadio.value != qs[i].answer) {
                    currentRadio.parentNode.setAttribute("class", "wrong");
                } else if (currentRadio.checked && currentRadio.value == qs[i].answer) {
                    currentRadio.parentNode.setAttribute("class", "correct");
                    score++;
                } else if (currentRadio.value == qs[i].answer) {
                    currentRadio.parentNode.setAttribute("class", "correct");
                }
            }
        }
        $("#score").text("Score:" + score + "/" + qs.length)
    },

    retrieveQuiz: function() {
        $.get("api/quizzes/")
            .done(data => {
                this.model.questions = data;
                console.log(this.model.questions);
                //this.displayQuiz();
            });
    },

    displayQuiz: function() {
        var qs = this.model.questions;
        $("#question-container").html("")
        for (var i = 0; i < qs.length; i++) {
            var cont = document.createElement("div")
            var p = document.createElement("span");
            var question = document.createElement("p")
            var title = document.createElement("div")
            title.setAttribute("id", "question" + i)
            cont.setAttribute("id", "question" + this.count)
            p.setAttribute("class", "lead")
            p.innerHTML = "Question " + (i + 1);
            question.innerHTML = qs[i].question;
            title.setAttribute("class", "asd")
            title.appendChild(p)
            title.appendChild(question)
            cont.appendChild(title)
            for (var j = 0; j < 4; j++) {
                var div = document.createElement("div");
                var input = document.createElement("input");
                var label = document.createElement("label")
                div.classList.add("custom-control")
                div.classList.add("custom-radio")
                div.classList.add("custom-control-lg")
                cont.appendChild(div)
                input.setAttribute("type", "radio");
                input.setAttribute("name", "rad" + (i + 1))
                input.setAttribute("id", "rad" + this.count + "a" + j);
                input.setAttribute("class", "custom-control-input")
                input.setAttribute("value", j)
                div.appendChild(input);
                label.setAttribute("class", "custom-control-label")
                label.setAttribute("for", "rad" + this.count++ + "a" + j)
                label.innerHTML = qs[i].answers[j].answer;
                div.appendChild(label);
                cont.appendChild(div);
            }
            this.$questionsContainer.append(cont);
        }
    },
}