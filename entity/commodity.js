module.exports = (function() {
    var mongoose=require('mongoose'),
        db = require('../DAO/DAO'),
        commoditySchema = new mongoose.Schema({
            userName: String, //定义一个属性name，类型为String
            userPassword: String
        }),
        commodityModel = db.model('commodity', userSchema);
    return {

    }
})();
