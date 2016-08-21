var express = require('express');
var router = express.Router();
var user=require('../entity/user');
/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.userName === undefined) {
        res.jsonp({ msg: 'unLogin' });
    } else {
        res.jsonp({
            session:req.session,
        	userName:req.session.userName,
            msg: "ok"
        });
    }
});

router.put('/',function(req, res) {
	user.checkUserLogin(req.body,function(msg) {
        req.session.userName=req.body.userName;
        res.jsonp(msg);
    });
});
router.delete('/',function(req, res) {
	req.session.userName = undefined;
    res.jsonp({
        msg:'ok'
    });
});
module.exports = router;
