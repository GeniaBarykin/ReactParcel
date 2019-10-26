const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
var serveStatic = require('serve-static');

// Create an express app
const app = express();

// Open the database
createDb();

function createDb(ready) {
    app.db = new sqlite3.Database('data/sqlite3.db');

    // Make sure tables and initial data exist in the database
    let stmts = fs.readFileSync('data/schema.sql').toString().split(/;\s*\n/);
    function next(err) {
        if (err) console.warn(err);
        let stmt = stmts.shift();
        if (stmt) app.db.run(stmt, next);
        else if (ready) ready();
    }
    next();
}

// Configure express to automatically decode WWW FORM bodies
app.use(bodyParser.json());

//Serve static data from our Parcel Middleware
app.use(serveStatic(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
     res.sendFile('index.html', {root: path.join(__dirname, 'dist')});
});
app.get('/game', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'dist')});
});
app.get('/hall', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'dist')});
});



// Put a reference to our db in the request, so that rules can easily access it.
app.use(function(req,rsp,next){
    req.db = app.db;
    next();
});

//Include our rest api
app.use(require('./rest-api/api-index'));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started at port: ' + port);