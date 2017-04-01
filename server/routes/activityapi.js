const express = require('express');
const router = express.Router();
var db = require('../config/db');

const uf = require('../functions/activity');


var users = express.Router();
users.get('/:id', uf.getActivity);
users.post('/', uf.saveActivity);
users.put('/', uf.updateActivity);
users.get('/all', uf.getAll);
users.get('/allAssigned/:id', uf.getAllAssigned);
users.get('/allCreated/:id', uf.getAllCreated);
users.get('/:id', function(req, res) {});
users.patch('/:id', function(req, res) {});
users.delete('/:id', function(req, res) {});



module.exports = users;