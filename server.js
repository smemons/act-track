let express = require("express");
var path = require('path');
let app = require('express')();
let http = require('http').Server(app);

const bodyParser = require('body-parser');


const userapi = require('./server/routes/userapi');
const catapi = require('./server/routes/categoryapi');
const actapi = require('./server/routes/activityapi');
const taskapi = require('./server/routes/taskapi');
const deptapi = require('./server/routes/deptapi');
const visapi = require('./server/routes/visibilityapi');



// // Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'dist')));

// // Set our api routes
app.use('/api/user', userapi);
app.use('/api/category', catapi);
app.use('/api/activity', actapi);
app.use('/api/task', taskapi);
app.use('/api/dept', deptapi);
app.use('/api/vis', visapi);


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



// /**
//  * Get port from environment and store in Express.
//  */
const port = process.env.PORT || '3000';
app.set('port', port);

http.listen(port, function() {
    console.log('listening on *:3000');
});