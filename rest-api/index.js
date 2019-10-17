let router = module.exports = require('express').Router();


// Your code goes here!! (and of course in files you'll require() from here)

//router.use("/beers", require("./beermanager"));

//router.post etc..

router.get('/api/example', function(req, rsp){
    rsp.status(200).json({Test: "Very nice boyss"});
});

router.get('/examples/:id', function(req, rsp) {
    req.db.get('select * from beers where id=?', req.params.id, function(err, beer) {
        if(err) console.warn(err);
        if (beer) rsp.status(200).json(beer);
        else rsp.status(404).json({error: "No such beer"});
    });
});


router.use(function(req,rsp) {
    rsp.status(404).json({error: "No such route"})
});

