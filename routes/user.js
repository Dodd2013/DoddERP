var express = require('express');
var router = express.Router();
var user=require('../entity/user');


router.route('/').put(function(req, res, next) {
	var data=req.body;
    user.addUser(data,function(msg) {
    	res.jsonp(msg);
    });
}).get(function(req, res, next) {
    res.jsonp({
    	session:req.session.x,
        msg: 'respond with a resource'
    });
});

module.exports = router;
