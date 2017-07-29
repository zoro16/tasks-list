taskApp.controller('TaskCtrl', function($rootScope, $scope, tasksFactory) {
    $scope.tasks = [];
    $scope.isEditable = [];
    // get all Tasks on Load
    tasksFactory.getTasks().then(function(data) {
        $scope.tasks = data.data;
    });
    // Save a Task to the server
    $scope.save = function($event) {
        if ($event.which == 13 && $scope.nameInput &&
            $scope.descriptionInput) {

            $scope.dateCreated = new Date();
            $scope.dateUpdated = new Date();
            tasksFactory.saveTask({
                "name": $scope.nameInput,
                "description": $scope.descriptionInput,
                "dateCreated": $scope.dateCreated, 
                "dateUpdated": $scope.dateUpdated
            }).then(function(data) {
                $scope.tasks.push(data.data);
            });
            $scope.nameInput = '';
            $scope.descriptionInput = '';
            $scope.nameInput = '';
            $scope.nameInput = '';
        }
    };
    //update the status of the Task
    $scope.updateStatus = function($event, _id, i) {
        var _t = $scope.tasks[i];
        var dateUpdated = new Date();
        tasksFactory.updateTask({
            _id: _id,
            name: _t.name,
            description: _t.description,
            dateCreated: -t.dateCreated,
            dateUpdated: dateUpdated
        })
    };
    // Update the edited Task
    $scope.edit = function($event, i) {
        if ($event.which == 13 && $event.target.value.trim()) {
            console.log("event currentTarget:", $event.currentTarget)
            console.log("event value: ", $event.target.value)
            var _t = $scope.tasks[i];
            var dateUpdated = new Date();
            var name = _t.name
            var description = _t.description

            if ($event.currentTarget.id == "name" ) {
                name = $event.currentTarget.value.trim()
            }
            if ($event.currentTarget.id == "description" ) {
                description = $event.currentTarget.value.trim()
            }

            tasksFactory.updateTask({
                _id: _t._id,
                name: name,
                description: description,
                dateCreated: _t.dateCreated,
                dateUpdated: dateUpdated,
            }).then(function(data) {
                console.log("data: ", data);
                console.log("$event.target: ", $event);
                _t.name = name;
                _t.description = description;
                $scope.isEditable[i] = false;
            });
        }
    };

    // Delete a Task
    $scope.delete = function(i) {
        tasksFactory.deleteTask($scope.tasks[i]._id).then(function(data) {
            if (data.data) {
                $scope.tasks.splice(i, 1);
            }
        });
    };
});
