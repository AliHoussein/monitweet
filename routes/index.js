var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var appDir = path.dirname(require.main.filename); // http://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/json/tweets.json', function(req, res) {

	// var uid = req.params.uid,
	// 	path = req.params[0] ? req.params[0] : '/json/tweets.json';
	path = appDir + '/../public/json/tweets.json';
	console.log(path);
  
  fs.readFile(path, function(err, data) {
	  if (err) {
	    console.log(err);
	    res.send(JSON.stringify(err));
	  }

    var tweets = JSON.parse(data);
    tweets.push(req.body);
  	fs.writeFile(path, JSON.stringify(tweets, null, 4), function(err) {
		  if (err) {
		    console.log(err);
		    res.send(JSON.stringify(err));
		  }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(tweets));

    });
  });



});

module.exports = router;
