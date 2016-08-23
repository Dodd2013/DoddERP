var express = require('express');
var router = express.Router();
var user=require('../entity/user');
/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.userName === undefined) {
        res.jsonp({ msg: 'unLogin' });
    } else {
        res.jsonp({
        	userName:req.session.userName,
            msg: "ok"
        });
    }
});

router.put('/',function(req, res) {
	user.checkUserLogin(req.body,function(msg) {
        req.session.userName=req.body.userName;
        req.session.userRole=msg.userRole;
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
