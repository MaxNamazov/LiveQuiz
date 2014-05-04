'use strict';

//Setting up route
angular.module('mean.questions').config(['$stateProvider',
    function($stateProvider) {
        // states for my app
        $stateProvider
            .state('all questions', {
                url: '/questions',
                templateUrl: 'public/questions/views/list.html'               
            })
            .state('create question', {
                url: '/questions/create',
                templateUrl: 'public/questions/views/create.html'               
            })
            .state('edit question', {
                url: '/questions/:questionId/edit',
                templateUrl: 'public/questions/views/edit.html'                
            })
            .state('question by id', {
                url: '/questions/:quesetionId',
                templateUrl: 'public/questions/views/view.html'                
            });
    }
]);
