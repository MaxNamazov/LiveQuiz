'use strict';

// Questions routes use questions controller
var questions = require('../controllers/questions');

module.exports = function(app) {

    app.route('/questions')
        .get(questions.all)
        .post(questions.create);
    app.route('/questions/:questionId')
        .get(questions.show)
        .put(questions.update)
        .delete(questions.destroy);
    app.route('/questions/:questionId/:answerId').
    	put(questions.like(app.io));

    // Finish with setting up the questionId param
    app.param('questionId', questions.question);

};