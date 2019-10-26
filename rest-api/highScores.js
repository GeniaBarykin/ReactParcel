let router = module.exports = require('express').Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";

let userName;


/**
 * Checks authorization
 */
router.use(function (req, rsp, next) {
    if (req.headers.authorization === undefined) rsp.status(401).json({error: "No permission"});
    else {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) throw err;
            if (decoded.level === 1 || decoded.level === 9) {
                userName = decoded.userName;
                next();
            }
        });
    }
});


/**
 * Gets a json with all userNames, score sorted by score DESC
 */

router.get('/', function (req, rsp){
   req.db.all('SELECT * FROM highScores ORDER BY highscore DESC', function(err, highScores){
       if(!highScores) rsp.status(404).json({error: "No highScores found"});
       else{
           rsp.status(200).json(highScores);
       }
   })
});

/**
 * Gets the scores of a specific user
 */
router.get('/myscore', function (req, rsp) {
    req.db.get('SELECT * from highScores WHERE userName = ?', userName, function (err, highScore) {
        if (!highScore) rsp.status(200).json(
            {
                "userName": userName,
                "highscore": 0
            }
        );
        else {
            rsp.status(200).json(highScore);
        }
    });
});

/**
 * Adds a click to the users score
 */
router.put('/', function (req, rsp) {
    req.db.get('SELECT highscore FROM highScores WHERE userName = ?', userName, function (err, userScore) {
        if (err) throw err;
        if (!userScore){
            let score = 0;
            req.db.run('INSERT INTO highScores (userName,highscore) values(?, ?)', [userName, score], function (err) {
                if (err) throw err;
                rsp.status(201).json({score: score});
            })
        } else {
            let score = userScore.highscore + 1;
            req.db.run('UPDATE highScores SET highscore = ? WHERE userName = ?', [score, userName], function (err) {
                if (err) throw err;
                rsp.status(201).json({score: score});
            })
        }
    })
});
