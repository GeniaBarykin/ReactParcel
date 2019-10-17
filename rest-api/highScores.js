let router = module.exports = require('express').Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aWV$AfceSCDsF1xazfjvaqzc4te";

let userName;

// /**
//  * Checks authorization
//  */
// router.use(function (req, rsp, next) {
//     if (req.headers.authorization === undefined) rsp.status(401).json({error: "No permission"});
//     else {
//         var token = req.headers.authorization.split(' ')[1];
//         jwt.verify(token, JWT_SECRET, function (err, decoded) {
//             if (err) throw err;
//             console.log(decoded)
//             if (decoded.level === 1 || decoded.level === 9) {
//                 userName = decoded.userName;
//                 next();
//             } else {
//                 rsp.status(401).json({error: "No permission"});
//             }
//         });
//     }
// });

/**
 * Gets a list of all highscores and userNames sorted by score
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
 * Gets the scores of a user
 */
router.get('/:name', function (req, rsp) {
    let userName = req.params.name;
    req.db.get('SELECT * from highScores WHERE userName = ?', userName, function (err, highScore) {
        if (!highScore) rsp.status(404).json({error: "User does not exist"});
        else {
            rsp.status(200).json(highScore);
        }
    });
});

/**
 * Adds a score to a user
 */
router.post('/', function (req, rsp) {
    let userName = req.params.name;
    let score = req.body.score;

    req.db.get('select * from highScores where userName = ?', userName, function (err, userName) {
        if (err) throw err;
        if (!userName) rsp.status(404).json({error: "No such user!"});
        else {
            req.db.run('insert into highScores values(?,?)', [userName, score]);
            rsp.status(201).json({userName:userName, score: score});
        }
    })
});

/**
 * 'Dislikes' a beer
 */
router.delete('/:beerId', function (req, rsp) {
    //Get userId
    let beerId = req.params.beerId;

    req.db.get('select * from beers where id = ?', beerId, function (err, beer) {
        if (err) throw err;
        if (!beer) rsp.status(404).json({error: "No such beer!"});
        else {
            req.db.get('select * from likes where userName=? and beerId = ?', [userName, beerId], function (err, like) {
                if (!like) rsp.status(403).json({error: "You can't unlike not-liked beer!"});
                else {
                    req.db.run('delete from likes where userName = ? and beerId = ?', [userName, beerId]);
                    rsp.status(200).json(like);
                }
            });
        }
    });
});
