(function($){  
        $.fn.serializeJson=function(){  
            var serializeObj={};  
            $(this.serializeArray()).each(function(){  
                serializeObj[this.name]=this.value;  
            });  
            return serializeObj;  
        };  
    })(jQuery);  
var app = angular.module('DoddERP',  ['ngRoute']);


app.controller('homeCtrl', function($scope, $http) {
	$scope.msg='';
	$scope.user={
		userName:''
	};
	$scope.alert=function(msg) {
		$scope.msg=msg;
		$('#myModal').modal();
	};
	$http.get('session',{}).success(function(data) {
		if(data.msg==='unLogin'){
			window.location.href='login.html';
		}
		$scope.user.userName=data.userName;
	}).error(function(data) {
		$scope.alert("服务器繁忙，请稍后再试！");
	});
	$scope.exit=function() {
		$http.delete('session',{}).success(function(data) {
			if(data.msg==='ok'){
				window.location.href='login.html';
			}else{
				$scope.alert("服务器繁忙，请稍后再试！");
			}
		}).error(function(data) {
			$scope.alert("服务器繁忙，请稍后再试！");
		})
	};
	$('.nav-sidebar').on('click','li',function(e) {
		$('.nav-sidebar li').removeClass('active');
		$(e.target).parent('li').addClass('active');
	});
});


app.controller('commodityCtrl', function($scope, $http) {
	var commodityStatusFormatter=function(value,row,index) {
		if(value===1){
			return "在售";
		}else{
			return "停售";
		}
	};
	var opFormatter=function(v,r,i) {
		return "<button type='button' class='btn btn-warning btn-xs commodity-edit-btn' data-row-id='"+r._id+"' >修改</button> <button type='button' class='btn btn-danger btn-xs commodity-remove-btn' data-row-id='"+r._id+"' >删除</button>";
	};
	$('#commodityTable').bootstrapTable({
	    columns: [{
	        field: '_id',
	        title: '商品ID',
	        visible:false
	    }, {
	        field: 'commodityName',
	        title: '商品名称'
	    }, {
	        field: 'commodityWeight',
	        title: '克重'
	    }, {
	        field: 'commoditySpecification',
	        title: '商品规格'
	    }, {
	        field: 'commodityUnit',
	        title: '计量单位'
	    }, {
	        field: 'commodityRMDPrice',
	        title: '报价'
	    }, {
	        field: 'commodityDesc',
	        title: '商品说明'
	    }, {
	        field: 'commodityStatus',
	        title: '商品状态',
	        formatter:commodityStatusFormatter
	    }, {
	        title: '操作',
	        formatter:opFormatter
	    }],
	    uniqueId:'_id',
	    sidePagination:'server',
	    search:true,
	    url: "commodity",
	    pagination: true,
	    pageSize: 10,
	    toolbar: "#comodityToolbar",
	    toolbarAlign: "left"
	});

	$('#commodityTable').on('click','.commodity-edit-btn',function(e) {
		$scope.$apply(function() {
			$scope.formData=$('#commodityTable').bootstrapTable('getRowByUniqueId',$(e.target).attr("data-row-id"));
			$scope.formData.commodityStatus=String($scope.formData.commodityStatus);
		});
		$('#editComodity').modal();
	});

	$scope.addComodityBtn=function() {
		$http({
			url:'commodity',
			method:'PUT',
			data:$("#addComodityFrom").serializeJson()
		}).success(function(json) {
			if(json.ok===1){
				new PNotify({text:'添加商品成功！',type: 'success'});
			}else{
				new PNotify({text:'添加商品失败！',type: 'danger'});
			}
		}).error(function() {
			new PNotify({text:'服务器繁忙，请稍后再试！',type: 'danger'});
		});
	};
	$scope.editComodityBtn=function() {
		var data=$("#editComodityFrom").serializeJson();
		data._id=$scope.formData._id;
		$http({
			url:'commodity',
			method:'POST',
			data:data
		});
	};
});


app.controller('indexController', function($scope, $http) {

});


app.config([
    '$routeProvider',function ($routeProvider) {
    	$routeProvider
    		.when('/commodity',{
    			templateUrl: 'temp/commodity.html',
                controller: 'commodityCtrl'
    		}).when('/index',{
    			templateUrl: 'temp/index.html',
                controller: 'indexController'
    		}).otherwise('/index');
}]);