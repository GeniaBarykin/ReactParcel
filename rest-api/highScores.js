let router = module.exports = require('express').Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";

let userName;



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
router.get('/:name', function (req, rsp) {
    let userName = req.params.name;
    req.db.all('SELECT * from highScores WHERE userName = ? ORDER BY highscore DESC', userName, function (err, highScore) {
        if (!highScore) rsp.status(404).json({error: "User does not exist"});
        else {
            rsp.status(200).json(highScore);
        }
    });
});

/**
 * Adds a click to the users score
 */
router.post('/', function (req, rsp) {
    let name = req.body.name;

    req.db.get('SELECT highscore FROM highScores WHERE userName = ?', name, function (err, userScore) {
        if (err) throw err;
        if (!userScore){
            let score = 0;
            req.db.run('INSERT INTO highScores (userName,highscore) values(?, ?)', [name, score], function (err) {
                if (err) throw err;
                rsp.status(201).json({score: score});
            })
        } else {
            let score = userScore.highscore + 1;
            req.db.run('UPDATE highScores SET highscore = ? WHERE userName = ?', [score, name], function (err) {
                if (err) throw err;
                rsp.status(201).json({score: score});
            })
        }
    })
});
