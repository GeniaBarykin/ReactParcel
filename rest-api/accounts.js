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
 */
router.get("/", function (req, rsp) {
    req.db.all("SELECT * FROM users", (error, users) => {
        if (error) throw error;
        rsp.status(200).send(users);
    });
});

/**
 * Adds a new user
 * For Admin only!
 */
router.post('/', function (req, rsp) {
    if (level === 9) { //9lv - is an admin
        let {name, password, level} = req.body;

        req.db.get('select * from users where name=?', name, function (err, user) {
            if (user) rsp.status(403).json({error: "A user with that name already exists"});
            else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw (err)
                        req.db.run('insert into users values (?,?,?)', [name, hash, level], function (err, user) {
                            if (err) throw (err);
                            rsp.status(201).json({createdUser: name,});
                        });
                    });
                });
            }
        });
    } else {
        rsp.status(401).json({error: "Only admin can add a new user"});
    }
});
