let router = module.exports = require('express').Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";
const bcrypt = require('bcrypt');

let level;

/**
 * Checks authorization
 */
router.use(function (req, rsp, next) {
    if (req.headers.authorization === undefined) rsp.status(401).json({error: "No permission"});
    else {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) throw err;
            console.log(decoded);
            if (decoded.level === 1 || decoded.level === 9) {
                level = decoded.level;
                next();
            } else {
                rsp.status(401).json({error: "No permission"});
            }
        });
    }
});

/**
 * Gets list of users for all users with token
 * Only for admin
 */
router.get("/", function (req, rsp) {
    if(level === 9) {
        req.db.all("SELECT * FROM users", (error, users) => {
            if (error) throw error;
            rsp.status(200).send(users);
        });
    } else {
        rsp.status(401).json({error: "Only the admin can show all users"});
    }
});
