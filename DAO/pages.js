var mongoose = require('mongoose');
var async = require('async');
/*
* @page: 页数
* @pageSize:每页数量
* @Model:实体模型
* 
 */
var pageQuerySearch = function(page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = page;
    var cond={};
    var $page = {};
    var reg =new RegExp(".*"+(queryParams||'')+".*");
    queryObject=[];
    for (key in Model.schema.paths) {
        if(key!=='_id'&&key!=='__v'&&Model.schema.paths[key].instance==='String'){
            cond={};
            cond[key]={$regex:reg};
            queryObject.push(cond);
        }
    }
    queryParams={$or:queryObject};
    async.parallel({
        count: function(done) { // 查询数量
            Model.count(queryParams).exec(function(err, count) {
                done(err, count);
            });
        },
        records: function(done) { // 查询一页的记录
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function(err, doc) {
                done(err, doc);
            });
        }
    }, function(err, results) {
        var count = results.count;
        $page.total = count;
        $page.rows = results.records;
        callback(err, $page);
    });
};


var pageQuery = function(page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = page;
    var $page = {
        pageNumber: page
    };

    async.parallel({
        count: function(done) { // 查询数量
            Model.count(queryParams).exec(function(err, count) {
                done(err, count);
            });
        },
        records: function(done) { // 查询一页的记录
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function(err, doc) {
                done(err, doc);
            });
        }
    }, function(err, results) {
        var count = results.count;
        $page.total = count;
        $page.rows = results.records;
        callback(err, $page);
    });
};

module.exports = {
    pageQuery: pageQuery,
    pageQuerySearch:pageQuerySearch
};
