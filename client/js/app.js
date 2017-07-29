taskApp = angular.module('taskApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/task.html',
                controller: 'TaskCtrl'
            }).otherwise({
                redirectTo: '/'
            });
    });
