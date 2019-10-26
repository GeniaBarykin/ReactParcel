let router = module.exports = require('express').Router();

const express = require("express");
const bodyParser = require("body-parser");

router.get('/', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'dist')});
});

const app = express();
app.use(bodyParser.json());

router.use('/api/highScores', require('./highScores'));
router.use('/api/auth', require('./auth'));

router.use(function(req,rsp) {
    rsp.status(404).json({error: "No such route"})
});

