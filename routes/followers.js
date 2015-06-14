var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res, next) {

  //connect to twitter api

  res.render('followers', { title: '' });
});

module.exports = router;
