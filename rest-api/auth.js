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
