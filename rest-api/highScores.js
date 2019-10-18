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
 * Adds a score to a user
 */
router.post('/', function (req, rsp) {
    let {name, score} = req.body;

    req.db.get('select * from highScores where userName = ?', name, function (err, userName) {
        if (err) throw err;
        if (!userName) rsp.status(404).json({error: "No such user!"});
        else {
            req.db.run('insert into highScores values(?,?)', [name, score]);
            rsp.status(201).json({userName:name, score: score});
        }
    })
});
