'use strict';

//Questions service used for questions REST endpoint
angular.module('mean.questions').factory('Questions', ['$resource', function($resource) {
    return $resource('questions/:questionId/:answerId', {
        questionId: '@_id',
        answerId: '@answerId'
    }, {
        update: {
            method: 'PUT'
        },
        saveData:{
        	method: 'POST'
        },
        like:{
            method: 'PUT'
           
        }
    });
}]);