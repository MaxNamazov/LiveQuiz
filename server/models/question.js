'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AnswerSchema = require('./answer').schema,
    Answer = mongoose.model('Answer');


/**
 * Question Schema
 */
var QuestionSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    answers: [AnswerSchema]    
});

/**
 * Validations
 */
QuestionSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
QuestionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};


mongoose.model('Question', QuestionSchema);
