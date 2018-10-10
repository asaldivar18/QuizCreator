var QuizController = function(model, view) {
    this.model = model;
    this.view = view;
    this.init();
};

QuizController.prototype = {

    init: function() {
        this.setupHandlers()
            .enable();
    },

    setupHandlers: function() {
        return this;
    },

    enable: function() {
        return this;
    },
};