var mongoskin = require('mongoskin');
var config=require('../config');

module.exports = (function(){
    var host = config.mongodbHost,
        port = config.mongodbPort,
        dbName = config.mongodbName,
        userName = config.mongodbUserName,
        password = config.mongodbPassWord,
        str = 'mongodb://' + userName + ':' + password + '@' + host +':' + port+ '/' + dbName;
        if(userName===undefined){
        	str='mongodb://'+host+":"+port+"/"+dbName;
        }
    var option = {
        native_parser: true
    };
    return mongoskin.db(str, option);
})();