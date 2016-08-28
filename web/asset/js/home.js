(function($) {
    $.fn.serializeJson = function() {
        var serializeObj = {};
        $(this.serializeArray()).each(function() {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
})(jQuery);
var app = angular.module('DoddERP', ['ngRoute']);


app.controller('homeCtrl', function($scope, $http) {
    $scope.msg = '';
    $scope.user = {
        userName: ''
    };
    $scope.alert = function(msg) {
        $scope.msg = msg;
        $('#myModal').modal();
    };
    $http.get('session', {}).success(function(data) {
        if (data.msg === 'unLogin') {
            window.location.href = 'login.html';
        }
        $scope.user.userName = data.userName;
    }).error(function(data) {
        $scope.alert("服务器繁忙，请稍后再试！");
    });
    $scope.exit = function() {
        $http.delete('session', {}).success(function(data) {
            if (data.msg === 'ok') {
                window.location.href = 'login.html';
            } else {
                $scope.alert("服务器繁忙，请稍后再试！");
            }
        }).error(function(data) {
            $scope.alert("服务器繁忙，请稍后再试！");
        })
    };
    $('.nav-sidebar').on('click', 'li', function(e) {
        $('.nav-sidebar li').removeClass('active');
        $(e.target).parent('li').addClass('active');
    });
});


app.controller('commodityCtrl', function($scope, $http) {

    $('#commodityTable').bootstrapTable({});

    $('#commodityTable').on('click', '.commodity-edit-btn', function(e) {
        $scope.$apply(function() {
            $scope.formData = $('#commodityTable').bootstrapTable('getRowByUniqueId', $(e.target).attr("data-row-id"));
            $scope.formData.commodityStatus = String($scope.formData.commodityStatus);
        });
        $('#editComodity').modal();
    });
    $('#commodityTable').on('click', '.commodity-remove-btn', function(e) {
        var data = $('#commodityTable').bootstrapTable('getRowByUniqueId', $(e.target).attr("data-row-id"));
        (new PNotify({
            title: '确认删除该商品',
            text: '确认删除以下商品吗？<br/>商品名称:' + data.commodityName + " <br/>克重:" + data.commodityWeight + "<br/>规格:" + data.commoditySpecification + "<br/>计量单位:" + data.commodityUnit,
            icon: 'glyphicon glyphicon-question-sign',
            hide: false,
            confirm: {
                confirm: true
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            },
            addclass: 'stack-modal',
            stack: { 'dir1': 'down', 'dir2': 'right', 'modal': true }
        })).get().on('pnotify.confirm', function() {
        	$http({
        	    url: 'commodity/'+data._id,
        	    method: 'DELETE',
        	}).success(function(msg) {
        		if (msg.ok === 1) {
        		    new PNotify({ text: '删除商品成功！', type: 'success' });

        		    //刷新表格
        		    $('#commodityTable').bootstrapTable('refresh', { silent: true });
        		} else {
        		    new PNotify({ text: '删除商品失败！', type: 'danger' });
        		}
        	}).error(function(err) {
        		new PNotify({ text: '服务器繁忙，请稍后再试！', type: 'danger' });
        	});
        }).on('pnotify.cancel', function() {});

    });

    $('#addComodityFrom').validate({
        rules: {
            commodityName: {
                required: true,
                minlength: 2
            },
            commodityWeight: {
                required: true
            },
            commoditySpecification: {
                required: true
            },
            commodityUnit: {
                required: true
            },
            commodityRMDPrice: {
                required: true,
                min: 0
            },
            commodityStatus: {
                required: true
            }
        },
        messages: {
            commodityName: {
                required: "商品名不能为空",
                minlength: "商品名不能低于两个字"
            },
            commodityWeight: {
                required: "克重不能为空"
            },
            commoditySpecification: {
                required: "商品规格不能为空"
            },
            commodityUnit: {
                required: "计量单位不能为空"
            },
            commodityRMDPrice: {
                required: "报价不能为空，0为未定价",
                min: "报价不能低于0"
            },
            commodityStatus: {
                required: "商品状态不能为空"
            }
        },
        errorClass: "has-error",
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('has-error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('has-error');
        },
        submitHandler: function(form) {
            $scope.addComodityBtn();
        }
    });

    //添加商品
    $scope.addComodityBtn = function() {
        $http({
            url: 'commodity',
            method: 'PUT',
            data: $("#addComodityFrom").serializeJson()
        }).success(function(json) {
            if (json.ok === 1) {
                new PNotify({ text: '添加商品成功！', type: 'success' });
                $('#addComodity').modal('toggle');

                //刷新表格
                $('#commodityTable').bootstrapTable('refresh', { silent: true });
            } else {
                new PNotify({ text: '添加商品失败！', type: 'danger' });
            }
        }).error(function() {
            new PNotify({ text: '服务器繁忙，请稍后再试！', type: 'danger' });
            $('#addComodity').modal('toggle');
        });
    };


    $('#editComodityFrom').validate({
        rules: {
            commodityName: {
                required: true,
                minlength: 2
            },
            commodityWeight: {
                required: true
            },
            commoditySpecification: {
                required: true
            },
            commodityUnit: {
                required: true
            },
            commodityRMDPrice: {
                required: true,
                min: 0
            },
            commodityStatus: {
                required: true
            }
        },
        messages: {
            commodityName: {
                required: "商品名不能为空",
                minlength: "商品名不能低于两个字"
            },
            commodityWeight: {
                required: "克重不能为空"
            },
            commoditySpecification: {
                required: "商品规格不能为空"
            },
            commodityUnit: {
                required: "计量单位不能为空"
            },
            commodityRMDPrice: {
                required: "报价不能为空，0为未定价",
                min: "报价不能低于0"
            },
            commodityStatus: {
                required: "商品状态不能为空"
            }
        },
        errorClass: "has-error",
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('has-error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('has-error');
        },
        submitHandler: function(form) {
            $scope.editComodityBtn();
        }
    });

    //修改商品
    $scope.editComodityBtn = function() {
        var data = $("#editComodityFrom").serializeJson();
        $http({
            url: 'commodity/'+$scope.formData._id,
            method: 'POST',
            data: data
        }).success(function(json) {
            if (json.ok === 1) {
                new PNotify({ text: '修改商品成功！', type: 'success' });
                $('#editComodity').modal('toggle');

                //刷新表格
                $('#commodityTable').bootstrapTable('refresh', { silent: true });
            } else {
                new PNotify({ text: '修改商品失败！', type: 'danger' });
            }
        }).error(function() {
            new PNotify({ text: '服务器繁忙，请稍后再试！', type: 'danger' });
            $('#editComodity').modal('toggle');
        });
    };
});


app.controller('indexController', function($scope, $http) {

});


app.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/commodity', {
                templateUrl: 'temp/commodity.html',
                controller: 'commodityCtrl'
            }).when('/index', {
                templateUrl: 'temp/index.html',
                controller: 'indexController'
            }).otherwise('/index');
    }
]);
