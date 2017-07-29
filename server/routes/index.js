(function() {
    'use strict';
    var express = require('express');
    var router = express.Router();
    var mongojs = require('mongojs');
    var db = mongojs('meanTodo', ['todos']);
    /* GET home page. */
    router.get('/', function(req, res) {
        res.render('index');
    });
    router.get('/tasks', function(req, res) {
        db.todos.find(function(err, data) {
            res.json(data);
        });
    });
    router.post('/tasks', function(req, res) {
        db.todos.insert(req.body, function(err, data) {
            res.json(data);
        });
    });
    router.put('/tasks', function(req, res) {
        db.todos.update({
            _id: mongojs.ObjectId(req.body._id)
        }, {
            name: req.body.name,
            description: req.body.description,
            dateCreated: req.body.dateCreated,
            dateUpdated: req.body.dateUpdated
        }, {}, function(err, data) {
            res.json(data);
        });
    });
    router.delete('/tasks/:_id', function(req, res) {
        db.todos.remove({
            _id: mongojs.ObjectId(req.params._id)
        }, '', function(err, data) {
            res.json(data);
        });
    });
    module.exports = router;
}());
