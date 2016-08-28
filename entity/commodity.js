module.exports = (function() {
    var mongoose = require('mongoose'),
        db = require('../DAO/DAO'),
        pages = require('../DAO/pages');
    commoditySchema = new mongoose.Schema({
            commodityName: { type: String, required: true }, //商品名称
            commodityWeight: { type: Number, required: true }, //商品克重
            commoditySpecification: { type: String, required: true }, //商品规格
            commodityUnit: { type: String, required: true }, //计量单位
            commodityRMDPrice: { type: Number, required: true }, //报价
            commodityDesc: { type: String, required: true }, //商品说明
            commodityStatus: { type: Number, required: true } //商品状态
        }),
        commodityModel = db.model('commodity', commoditySchema);
    return {
        addCommodity: function(commodity, cb) {
            var commodityEntity = new commodityModel(commodity);
            commodityEntity.save(function(err) {
                if (err) {
                    cb({ ok: 0, msg: '服务器繁忙，请稍后再试' });
                } else {
                    cb({ ok: 1 });
                }
            });
        },
        getCommodity: function(cb) {
            commodityModel.find(function(err, obj) {
                if (err) {
                    cb({ ok: 0, msg: '服务器繁忙，请稍后再试' });
                } else {
                    cb(obj);
                }
            });
        },
        getComodityPages: function(page, pageSize, populate, queryParams, sortParams, cb) {
            pages.pageQuerySearch(page, pageSize, commodityModel, populate, queryParams, sortParams, cb);
        },
        getCommodityOn: function() {
            commodityModel.find({ commodityStatus: true }, function(err, obj) {
                if (err) {
                    cb({ ok: 0, msg: '服务器繁忙，请稍后再试' });
                } else {
                    cb(obj);
                }
            });
        }
    }
})();
