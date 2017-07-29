taskApp.factory('tasksFactory', function($http) {
    var urlBase = '/tasks';
    var _taskService = {
        getTasks: function() {
            return $http.get(urlBase);
        },
        saveTask: function(todo) {
            return $http.post(urlBase, todo);
        },
        
        updateTask: function(todo) {
            return $http.put(urlBase, todo);
        },
        deleteTask: function(id) {
            return $http.delete(urlBase + '/' + id);
        },
    };

    return _taskService;
});
