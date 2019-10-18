let router = module.exports = require('express').Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";
const bcrypt = require('bcrypt');

/**
 * Logs a user in
 * Returns token
 */
router.post("/", function (req, rsp) {
    let {name, password} = req.body;
    req.db.get('SELECT * FROM users WHERE name=?', [name], (error, userDB) => {
        if (error) throw error;
        if (userDB === undefined) {
            rsp.status(404).json({error: "User not found"});
        } else {
            bcrypt.compare(password, userDB.bcryptPassword, function (error, res) {
                if (error) throw error;
                if (res) {
                    let token = jwt.sign({
                        userName: userDB.name,
                        level: userDB.level
                    }, JWT_SECRET, {expiresIn: 120000000});
                    rsp.status(201).json({loggedInUser: name, token: token});
                } else {
                    rsp.status(403).json({error: "Invalid credentials"});
                }
            });
        }
    });
});

/**
 * Adds a new user
 * Can be used by new users
 */
router.post('/new', function (req, rsp) {
    let {name, password} = req.body;

    req.db.get('select * from users where name=?', name, function (err, user) {
        if (user) rsp.status(403).json({error: "A user with that name already exists"});
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw (err)
                    req.db.run('insert into users values (?,?,?)', [name, hash, 1], function (err, user) {
                        if (err) throw (err);
                        rsp.status(201).json({createdUser: name});
                    });
                });
            });
        }
    });
});
