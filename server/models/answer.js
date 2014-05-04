'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Answer Schema
 */
var AnswerSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    count:{
        type: Number,
        required: true,
        default: 0
    }
});

/**
 * Validations
 */
AnswerSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');



mongoose.model('Answer', AnswerSchema);
exports.schema = AnswerSchema;
