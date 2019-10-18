let router = module.exports = require('express').Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";
const bcrypt = require('bcrypt');

/**
 * Gets list of users for all users with token
 * Only for admin
 */
router.get("/", function (req, rsp) {
        req.db.all("SELECT * FROM users", (error, users) => {
            if (error) throw error;
            rsp.status(200).send(users);
        });
});
