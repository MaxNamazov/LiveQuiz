'use strict';

angular.module('mean.questions').controller('QuestionController', ['$scope', '$stateParams', '$location', 'Global', 'Questions', 'socket', function ($scope, $stateParams, $location, Global, Questions, socket) {
    $scope.global = Global;
    $scope.answers = [];

    socket.on('update', function(data){
        $scope.find();
    })

    $scope.create = function() {
        var question = {
            title: this.title,
            answers: $scope.answers
        };
        Questions.saveData(question);

        this.title = '';
        this.answer = '';
        this.answers = [];
    };

    $scope.remove = function(question) {
        if (question) {
            question.$remove();

            for (var i in $scope.questions) {
                if ($scope.questions[i] === question) {
                    $scope.questions.splice(i, 1);
                }
            }
        }
        else {
            $scope.question.$remove();
            $location.path('questions');
        }
    };

    $scope.update = function(qst) {
        var question = $scope.question || qst;
        if (!question.updated) {
            question.updated = [];
        }     

        question.$update(function() {
            //$location.path('questions');
        });
    };

    $scope.find = function() {
        Questions.query(function(questions) {
            $scope.questions = questions;
        });
    };

    $scope.findOne = function() {
        Questions.get({
            questionId: $stateParams.questionId
        }, function(question) {
            $scope.question = question;
        });
    };
    $scope.add = function(){
        $scope.answers.push({title:this.answer});
        this.answer = '';
    }; 
    $scope.like = function(){
        var that = this;
       var qstId = this.$parent.question._id,
            answId =  this.answer._id;
       Questions.like({
        _id: qstId,
        answerId: answId
       }, function(question){
            that.$parent.question = question;
       });
    };
    $scope.totalCount = function(question){
        var total = 0;
        for (var i = question.answers.length - 1; i >= 0; i--) {
            total+=question.answers[i].count;
        };
        return total;
    }
}]);