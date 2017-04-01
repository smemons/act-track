const express = require('express');
const router = express.Router();
var db = require('../config/db');

const uf = require('../functions/category');


var users = express.Router();
users.get('/', uf.getCategory);
users.post('/', uf.saveCategory);

users.get('/all', uf.getAll);
users.get('/:id', function(req, res) {});
users.patch('/:id', function(req, res) {});
users.delete('/:id', function(req, res) {});



module.exports = users;