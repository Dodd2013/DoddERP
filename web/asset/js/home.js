var app = angular.module('DoddERP', []);
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
});
