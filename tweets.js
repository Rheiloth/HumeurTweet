var express = require('express');
var router = express.Router();


router.get('/tweets', function(req, res) {
    var db = req.db;
    var collection = db.get('twitter_search');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/getlog', function(req, res) {
    var db = req.db;
    var collection = db.get('log');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/count', function(req, res) {
    var m;

    var myPythonScriptPath = 'public/javascripts/count.py';

    var PythonShell = require('python-shell');
    var pyshell = new PythonShell(myPythonScriptPath);

    pyshell.on('message', function (message) {
        console.log(message);
        m = message;
        res.send(message);
    });

    pyshell.end(function (err) {
        return m;
        console.log('message');

        if (err){
            throw err;
        };

        console.log('finished');
    });
    return m;
});


router.get('/keywords', function(req, res) {
    var db = req.db;
    var collection = db.get('keywords');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/addkeywords', function(req, res) {
    var db = req.db;
    var collection = db.get('keywords');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/addlog', function(req, res) {
    var db = req.db;
    var collection = db.get('log');
    collection.insert(req.body, function(err){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


router.get('/reload', function(req, res) {
    var myPythonScriptPath = 'public/javascripts/word.py';

    var PythonShell = require('python-shell');
    var pyshell = new PythonShell(myPythonScriptPath);

    pyshell.on('message', function (message) {
        console.log(message);
    });

    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log('finished');
    });

});


router.get('/correction', function(req, res) {
    var PythonShell = require('python-shell');

    var options = {
    };
    
    PythonShell.run('public/javascripts/correction.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
    });

});


router.get('/getnewtweets', function(req, res) {
    var myPythonScriptPath = 'public/javascripts/streaming_API.py';

    var PythonShell = require('python-shell');
    var pyshell = new PythonShell(myPythonScriptPath);

    pyshell.on('message', function (message) {
        console.log(message);
    });

    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log('finished');
    });
});


router.delete('/deletetweet/:id', function(req, res) {

    var db = req.db;
    var collection = db.get('twitter_search');
    var tweetToDelete = req.params.id;
    collection.remove({ '_id' : tweetToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/supplog', function(req, res) {

    var db = req.db;
    var collection = db.get('log');
    collection.remove();
});

router.delete('/deleteall', function(req, res) {

    var db = req.db;
    var collection = db.get('twitter_search');
    collection.remove();
});


router.delete('/removekeywords', function(req, res) {
    var db = req.db;
    var collection = db.get('keywords');
    collection.remove();
});


module.exports = router;