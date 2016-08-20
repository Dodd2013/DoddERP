var CRUD = require('../DAO/CRUD');
var user = new CRUD('user');
var crypto = require('./md5');
module.exports = (function() {
    return {
        getUserById: function(userID) {

        },
        checkUserLogin: function(userData,callback) {
            user.select({ userName: userData.userName }, function(obj) {
                if (obj.status === 0) {
                    callback({ status: 0, msg: '服务器繁忙，请稍后再试！' })
                } else {
                    if (obj.items.length !== 0) {
                    	if(crypto.md5(userData.userPassword)===obj.items[0].userPassword){
                    		callback({status: 1, msg: '用户登录成功'});
                    	}else{
                    		callback({ status: 0, msg: '密码错误' });
                    	}
                    } else {
                        callback({ status: 0, msg: '该用户不存在' });
                    }
                }
            });
        },
        addUser: function(data, callback) {
            if (data.userName.length < 4) {
                callback({ status: 0, msg: '用户名不能小于4个字节' });
            } else if (data.userPassword.length < 6) {
                callback({ status: 0, msg: '用户密码不能小于6个字节' });
            } else {
                user.select({ userName: data.userName }, function(obj) {
                    // console.log({userName:data.userName});
                    // console.log(obj);
                    if (obj.status === 0) {
                        callback({ status: 0, msg: '服务器繁忙，请稍后再试！' })
                    } else {
                        if (obj.items.length !== 0) {
                            callback({ status: 0, msg: '该用户已经存在!' });
                        } else {
                            data.userPassword = crypto.md5(data.userPassword);
                            user.insert(data, function(msg) {
                                callback(msg);
                            });
                        }
                    }
                });
            }
        },
        getAllUser: function() {

        }
    }
})();
