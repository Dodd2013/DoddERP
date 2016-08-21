var mongoose = require('mongoose');
var config = require('../config');

module.exports = (function() {
    var host = config.mongodbHost,
        port = config.mongodbPort,
        dbName = config.mongodbName,
        userName = config.mongodbUserName,
        password = config.mongodbPassWord,
        str = 'mongodb://' + userName + ':' + password + '@' + host + ':' + port + '/' + dbName;
    if (userName === undefined) {
        str = 'mongodb://' + host + ":" + port + "/" + dbName;
    }
    var option = {
        native_parser: true
    };
    var db = mongoose.createConnection(str);
    db.on('error', console.error.bind(console, '连接错误:'));
    return db;
})();
