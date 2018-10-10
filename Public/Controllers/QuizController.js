var QuizController = function(model, view) {
    this.model = model;
    this.view = view;
    this.init();
    this.model.questions = []
};

QuizController.prototype = {

    init: function() {
        this.setupHandlers()
            .enable();
    },

    setupHandlers: function() {

        this.addQuestionHandler = this.addQuestion.bind(this);
        this.finishQuizHandler = this.finishQuiz.bind(this);
        return this;
    },

    enable: function() {
        this.view.addQuestionEvent.attach(this.addQuestionHandler);
        this.view.finishQuizEvent.attach(this.finishQuizHandler);
        $(window).bind('beforeunload', function() {
            return 'Are you sure you want to leave?';
        });
        return this;
    },


    addQuestion: function(sender, args) {
        this.model.addQuestion(args.question);
    },

    finishQuiz: function(sender, args) {
        this.model.addQuestion(args.question);
    }
};