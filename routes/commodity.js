var express = require('express');
var router = express.Router();
var commodity=require('../entity/commodity');


router.route('/').put(function(req, res) {
	if(req.session.userRole!=='admin'){
		res.jsonp({ok:0,msg:'你不是管理员'});
	}else{
		var data=req.body;
	    commodity.addCommodity(data,function(msg) {
	    	res.jsonp(msg);
	    });
	}
	
}).get(function(req, res) {
	if(req.session.userName===undefined){
		res.jsonp({ok:0,msg:'用户没有登录'});
	}else{
		commodity.getCommodity(function(msg) {
			res.jsonp(msg);
		})
	}
});
router.get('/on',function(req,res) {
	if(req.session.userName===undefined){
		res.jsonp({ok:0,msg:'用户没有登录'});
	}else{
		commodity.getCommodity(function(msg) {
			res.jsonp(msg);
		})
	}
});

module.exports = router;
