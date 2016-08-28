 var app = angular.module('DoddERP', []);
    app.controller('loginCtrl', function($scope, $http) {
        $scope.user = {
            userName: '',
            userPassword: '',
            msg: '',
        };
        $scope.hidden = function() {
            $('.alert').addClass('hidden');
        };
        $scope.show = function() {
            $('.alert').removeClass('hidden');
        };
        $scope.login = function() {
            $http.put('session', $scope.user)
                .success(function(data) {
                    if (data.status === 1) {
                        window.location.href = 'home.html';
                    } else {
                        $scope.show();
                        $scope.user.msg = data.msg;
                    }
                })
                .error(function(data) {
                    $scope.show();
                    $scope.user.msg = data.msg;
                });
        };
        $('#form1').validate({
            rules: {
                userName: {
                    required: true,
                    minlength: 4
                },
                userPWD: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                userName: {
                    minlength: "用户名必须大于4个字符",
                    required: '用户名不能为空'
                },
                userPWD: {
                    minlength: "密码必须大于6个字符",
                    required: '密码不能为空'
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
                $scope.login();
            }
        });
        $http.get('session',{}).success(function(data) {
        	if(data.msg==='ok'){
        		window.location.href='home.html';
        	}
        }).error(function(data) {
        	$scope.user.msg = '服务器繁忙，请稍后再试';
        });
    });