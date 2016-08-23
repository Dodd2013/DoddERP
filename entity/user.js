module.exports = (function() {
    var mongoose=require('mongoose'),
        db = require('../DAO/DAO'),
        crypto = require('./md5'),
        userSchema = new mongoose.Schema({
            userName: String, //用户名
            userPassword: String, //用户密码
            userRole:String
        }),
        userModel = db.model('user', userSchema);
    return {
        getUserByName: function(userName,cb) {
            userModel.find({userName:userName},cb);
        },
        checkUserLogin: function(userData, callback) {
            userModel.find({userName:userData.userName}, function(err,obj) {
                if (err) {
                    callback({ status: 0, msg: '服务器繁忙，请稍后再试！' })
                } else {
                    if (obj.length !== 0) {
                        if (crypto.md5(userData.userPassword) === obj[0].userPassword) {
                            callback({ status: 1, msg: '用户登录成功',userRole:obj[0].userRole});
                        } else {
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
                userModel.find({ userName: data.userName }, function(err,obj) {
                    // console.log({userName:data.userName});
                    // console.log(obj);
                    if (err) {
                        callback({ status: 0, msg: '服务器繁忙，请稍后再试！' })
                    } else {
                        if (obj.length !== 0) {
                            callback({ status: 0, msg: '该用户已经存在!' });
                        } else {
                            data.userPassword = crypto.md5(data.userPassword);
                            var userEntity=new userModel(data);
                            userEntity.save(function(err,msg) {
                                if(err){
                                    callback({ status: 0, msg: '服务器繁忙，请稍后再试！' });
                                }
                                callback({ok:1});
                            });
                        }
                    }
                });
            }
        },
        getAllUser: function(callback) {
            userModel.find(function(err, persons) {
                if(err){
                    callback({ status: 0, msg: '服务器繁忙，请稍后再试！' });
                }else{
                    callback(persons);
                }
            });
        }
    }
})();
