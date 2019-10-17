let router = module.exports = require('express').Router();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";
const bcrypt = require('bcrypt');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

router.use('/api/users', require('./users'));
router.use('/api/highScores', require('./highScores'));
router.use('/api/auth', require('./auth'));

router.use(function(req,rsp) {
    rsp.status(404).json({error: "No such route"})
});

