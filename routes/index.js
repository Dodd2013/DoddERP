var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.jsonp({
  	msg:'Welcome to DoddERP API!'
  })
});

module.exports = router;
