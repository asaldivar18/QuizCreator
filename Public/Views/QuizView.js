/**
 * 
 * @param {Quiz} model 
 */
var QuizView = function(model) {
    this.model = model;
    this.addQuestionEvent = new Event(this);
    this.finishQuizEvent = new Event(this);
    this.resetQuizEvent = new Event(this);
    this.deleteQuestionEvent = new Event(this)
    this.count = 0;
    this.init();
};

QuizView.prototype = {
    init: function() {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    /**
     * Get DOM Elements
     */
    createChildren: function() {
        // cache the document object
        //this.retrieveQuiz();
        this.$container = $('.js-container');
        this.$addQuestionButton = $('#js-add-question-button');
        this.$finishQuizButton = $("#js-save-quiz-button");
        this.$resetQuizButton = $("#resetQuiz")
        this.$questionsContainer = this.$container.find(".js-question-container")
            //if (!this.model)
            //  this.displayQuestions();
            //this.newQuestion();
        return this;
    },

    /**
     * Handlers
     */
    setupHandlers: function() {

        this.resetQuizButtonHandler = this.resetQuizButton.bind(this)
        this.addQuestionButtonHandler = this.addQuestionButton.bind(this);
        this.finishQuizButtonHandler = this.finishQuizButton.bind(this)

        /**
        Handlers from Event Dispatcher
        */
        this.resetQuizHandler = this.resetQuiz.bind(this);
        this.addQuestionHandler = this.addQuestion.bind(this);
        this.finishQuizHandler = this.finishQuiz.bind(this);

        return this;
    },

    /**
     * Buttton events
     */
    enable: function() {

        this.displayQuestions();

        this.$addQuestionButton.click(this.addQuestionButtonHandler);
        this.$finishQuizButton.click(this.finishQuizButtonHandler);
        this.$resetQuizButton.click(this.resetQuizButtonHandler);

        /**
         * Event Dispatcher
         */
        this.model.addQuestionEvent.attach(this.addQuestionHandler);
        this.model.finishQuizEvent.attach(this.finishQuizHandler);
        this.model.resetQuizEvent.attach(this.resetQuizButtonHandler);
        return this;
    },


    /**
     * Adds a question
     */
    addQuestionButton: function() {
        this.update();

        this.addQuestion();

    },

    /**
     * Saves quiz to local Storage
     */
    saveQuiz: function() {
        json = JSON.stringify(this.model.questions)
        console.log(json);
        $.ajax({
            url: "api/quizzes/",
            type: "post",
            contentType: 'application/json',
            data: json,
        })
    },

    /**
     * Reset Quiz
     */
    resetQuiz: function() {
        this.count = 0;
        localStorage.clear();
        this.model.questions = [];
        this.$questionsContainer.html("");
        this.newQuestion();
    },

    /**
     * button event
     */
    resetQuizButton: function() {
        this.resetQuiz();
    },

    /**
     * Updates model with input from view
     */
    finishQuizButton: function() {
        var qs = $(".form-group")
            //this.model = {};
        this.model.resetQuiz();
        console.log(this.model);
        for (var i = 0; i < qs.length; i++) {
            console.log($(i + "q").val())
            console.log(i + "q");
            this.finishQuizEvent.notify({
                question: {
                    question: $("#" + i + "q").val(),
                    answer: $("input[name='" + "rad" + (i + 1) + "']:checked").val(),
                    difficulty: $("input[name='" + "dq-" + i + "']:checked").val(),

                    answers: [{
                            answer: $("#txtq" + i + "a0").val(),
                        },
                        {
                            answer: $("#txtq" + i + "a1").val(),
                        },
                        {
                            answer: $("#txtq" + i + "a2").val(),
                        },
                        {
                            answer: $("#txtq" + i + "a3").val(),
                        },
                    ],


                }
            });


        }
        this.saveQuiz();
    },

    /**
     * Creates new questions
     */
    updateQuestions: function() {
        this.newQuestion();
    },

    /**
     * Updates questions
     */
    update: function() {
        this.updateQuestions();
    },


    /**
     * Retrieves quiz from local storage
     */
    retrieveQuiz: function() {
        this.model.questions = JSON.parse(localStorage.getItem('quiz'));



    },



    finishQuiz: function() {},
    addQuestion: function(i) {},

    /**
     * Add a question to model
     */
    add: function(i) {
        this.finishQuizEvent.notify({

            question: {
                question: $("#" + i + "q").val(),
                answer: $("input[name='" + "rad" + (i + 1) + "']:checked").val(),
                //difficulty: $("input[name='" + "dq" + i +       "']:checked:").val(),
                difficulty: $("input[name='" + "dq-" + i + "']:checked").val(),
                answers: [{
                        answer: $("#txtq" + i + "a0").val(),
                    },
                    {
                        answer: $("#txtq" + i + "a1").val(),
                    },
                    {
                        answer: $("#txtq" + i + "a2").val(),
                    },
                    {
                        answer: $("#txtq" + i + "a3").val(),
                    },
                ],

            }
        });
    },

    difficultybtns: function(q, difficulty) {
        var div = document.createElement("div")
        var lab1 = document.createElement("label")
        var input1 = document.createElement("input")
        div.classList.add("custom-control", "custom-radio", "custom-control-inline")

        lab1.classList.add("custom-control-label")
        lab1.setAttribute("for", difficulty + q);
        lab1.innerHTML = difficulty
        input1.setAttribute("type", "radio");
        input1.setAttribute("name", "dq-" + q);
        input1.setAttribute("value", difficulty)
        input1.setAttribute("id", difficulty + q)
        input1.classList.add("custom-control-input")
            //input1.setAttribute("checked", "checked")

        div.append(input1)
        div.appendChild(lab1)
        return div;
    },

    /**
     * Displays questions from model.questions
     */
    displayQuestions: function() {
        this.count = 0;
        let count = this.count;
        var qs = this.model.questions
        let model = this.model;
        this.$questionsContainer.html("");
        //  console.log(this.model)
        for (var i = 0; i < qs.length; i++) {
            var div = document.createElement("div");
            var q = document.createElement("textarea");
            var qlabel = document.createElement("p")
            var removebtn = document.createElement("a")
            q.innerHTML = qs[i].question;
            removebtn.classList.add("float-right")
            removebtn.setAttribute("id", i + "rem")
            removebtn.addEventListener("click", () => {
                model.removeQuestion(count);
                this.displayQuestions();
            });
            removebtn.innerHTML = "<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
            div.setAttribute("class", "form-group")
            div.setAttribute("id", "m" + i);
            q.setAttribute("class", "form-control")
            q.setAttribute("id", i + "q ")
                //qlabel.setAttribute("for", i + "q");
            qlabel.innerHTML = "Question " + (i + 1);
            qlabel.appendChild(removebtn)
            div.appendChild(qlabel);
            div.appendChild(q)
            div.appendChild(this.difficultybtns(i, "hard"))
            div.appendChild(this.difficultybtns(i, "easy"))
            for (var j = 0; j < 4; j++) {
                var cont = document.createElement("div");
                var input = document.createElement("input");
                var label = document.createElement("label")
                var a1 = document.createElement("input");
                cont.classList.add("custom-control")
                cont.classList.add("custom-radio")
                cont.classList.add("custom-control-lg")
                div.appendChild(cont)

                input.setAttribute("type", "radio");
                input.setAttribute("name", "rad" + (i + 1))
                input.setAttribute("id", "rad" + (i + 1) + "a" + j);
                input.setAttribute("class", "custom-control-input")
                input.setAttribute("value", j)
                cont.appendChild(input);
                label.setAttribute("class", "custom-control-label")
                label.setAttribute("for", "rad" + (i + 1) + "a" + j)
                a1.setAttribute("type", "text")
                a1.setAttribute("class", "form-control")
                a1.setAttribute("id", "txtq" + i + "a" + j)
                a1.value = qs[i].answers[j].answer;
                //qs[i].answers[j].answer;
                label.appendChild(a1)
                cont.appendChild(label);
                div.appendChild(cont);
            }
            this.$questionsContainer.append(div);
            this.count++;
        }
    },

    /**
     * Creates a new question for user to input
     */
    newQuestion: function() {
        this.finishQuizButton();
        var qs = this.model.questions
        let model = this.model;
        let i = this.count
        if (i != null) {
            this.add(i - 1)
        }
        var div = document.createElement("div");
        var q = document.createElement("textarea");
        var qlabel = document.createElement("p")
        var removebtn = document.createElement("a")
        removebtn.classList.add("float-right")
        removebtn.setAttribute("id", i + "rem")
        removebtn.addEventListener("click", () => {
            console.log(i);
            model.removeQuestion(i);
            this.displayQuestions();
        });
        removebtn.innerHTML = "<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        div.setAttribute("class", "form-group")
        q.setAttribute("class", "form-control")
        q.setAttribute("id", (this.count + "q"))
        qlabel.setAttribute("for", i + "q");
        qlabel.innerHTML = "Question " + (i + 1);
        qlabel.appendChild(removebtn)
        div.appendChild(qlabel);
        div.appendChild(q)
        div.appendChild(this.difficultybtns(i, "hard"))
        div.appendChild(this.difficultybtns(i, "easy"))
        this.$questionsContainer.append(div);

        for (var j = 0; j < 4; j++) {
            var cont = document.createElement("div");
            var input = document.createElement("input");
            var label = document.createElement("label")
            var a1 = document.createElement("input");
            cont.classList.add("custom-control")
            cont.classList.add("custom-radio")
            cont.classList.add("custom-control-lg")
            div.appendChild(cont)
            input.setAttribute("type", "radio");
            input.setAttribute("name", "rad" + (i + 1))
            input.setAttribute("id", "rad" + (i + 1) + "a" + j);
            input.setAttribute("class", "custom-control-input")
            input.setAttribute("value", j)
            cont.appendChild(input);
            label.setAttribute("class", "custom-control-label")
            label.setAttribute("for", "rad" + (i + 1) + "a" + j)
            a1.setAttribute("type", "text")
            a1.setAttribute("class", "form-control")
            a1.setAttribute("id", "txtq" + i + "a" + j)
            label.appendChild(a1)
            cont.appendChild(label);
            div.appendChild(cont);
            $("#" + this.count + "q").focus()
        }
        console.log(model)
        this.count++
    },



}