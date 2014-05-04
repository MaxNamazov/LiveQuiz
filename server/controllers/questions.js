'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    _ = require('lodash');


/**
 * Find question by id
 */
exports.question = function(req, res, next, id) {
    Question.load(id, function(err, question) {
        if (err) return next(err);
        if (!question) return next(new Error('Failed to load question ' + id));
        req.question = question;
        next();
    });
};

/**
 * Create a question
 */
exports.create = function(req, res) {
    var question = new Question(req.body);
    question.save(function(err) {
        if (err) {
            return res.send({
                errors: err.errors
            });
        } else {
            res.jsonp(question);
        }
    });
};

/**
 * Update a question
 */
exports.update = function(req, res) {
    var question = req.question;

    question = _.extend(question, req.body);

    question.save(function(err) {
        if (err) {
            return res.send({
                errors: err.errors
            });
        } else {
            res.jsonp(question);
        }
    });
};


/**
 * Delete a question
 */
exports.destroy = function(req, res) {
    var question = req.question;

    question.remove(function(err) {
        if (err) {
            return res.send({
                errors: err.errors
            });
        } else {
            res.jsonp(question);
        }
    });
};

/**
 * Show a question
 */
exports.show = function(req, res) {
    res.jsonp(req.question);
};

/**
 * List of questions
 */
exports.all = function(req, res) {
    Question.find().exec(function(err, questions) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var response = JSON.parse(JSON.stringify(questions))
            response.forEach(function(question) {
                if (req.session.liked && req.session.liked[question._id]) {
                    question.likedAnswer = req.session.liked[question._id];
                }
            })

            res.jsonp(response);
        }
    });
};

/**
 * Like an answer
 */
exports.like = function(io) {
    return function(req, res) {
        if (!req.session.liked) {
            req.session.liked = {};
        }
        if (req.session.liked[req.question._id]) {
            req.question.answers.id(req.session.liked[req.question._id]).count--;
        }
        var answer = req.question.answers.id(req.params.answerId);
        answer.count++;
        req.session.liked[req.question._id] = req.params.answerId;

        req.question.save(function(err) {
            if (err) {
                return res.send({
                    errors: err.errors
                });
            } else {                
                var response = JSON.parse(JSON.stringify(req.question));
                response.likedAnswer = req.session.liked[req.question._id];
                io.sockets.emit('update', response);
                res.jsonp(response);
            }
        });
    }

}
