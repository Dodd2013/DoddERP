module.exports = (function() {
    var mongoose=require('mongoose'),
        db = require('../DAO/DAO'),
        commoditySchema = new mongoose.Schema({
            commodityName:String, //商品名称
            commodityUnit:String, //计量单位
            commodityRMDPrice:Number, //推荐价格
            commodityDesc:String, //商品说明
            commodityStatus:Boolean //商品状态
        }),
        commodityModel = db.model('commodity', commoditySchema);
    return {
        addCommodity:function(commodity,cb) {
            var commodityEntity=new commodityModel(commodity);
            commodityEntity.save(function(err) {
                if(err){
                    cb({ok:0,msg:'服务器繁忙，请稍后再试'});
                }else{
                    cb({ok:1});
                }
            });
        },
        getCommodity:function(cb) {
            commodityModel.find(function(err,obj) {
                if(err){
                    cb({ok:0,msg:'服务器繁忙，请稍后再试'});
                }else{
                    cb(obj);
                }
            });
        },
        getCommodityOn:function() {
            commodityModel.find({commodityStatus:true},function(err,obj) {
                if(err){
                    cb({ok:0,msg:'服务器繁忙，请稍后再试'});
                }else{
                    cb(obj);
                }
            });
        }
    }
})();
