angular.controller("login_controller", function($scope, loginfactory, $cookies, $location){
	$scope.note = false;
	$scope.showing = false;
	$scope.loginbox = {};

	$scope.login = function(){
		$scope.note = false;
		loginfactory.login($scope.loginbox, function(callback){
			$scope.note = callback;	
		});
		$scope.loginbox = {};
	}
	$scope.show = function(){
		$scope.showing = true;
	}
	$scope.gosignup = function(){
		$location.path("/signup");
	}
})

angular.factory("loginfactory", function($http, $location, $cookies, $cookieStore){
	var functions = {};
	var errors = false;
	functions.login = function (data, callback){
		$http.post('/login', data).success(function(result){
			
			if (result != "password wrong" && result != "cant find user"){
				
				$cookieStore.put("username", result.username);
				$cookieStore.put("_id", result._id);
				$cookieStore.put("admin", result.admin);
				
				if(result.admin == "False"){
					$location.path("/profile");
				}
				else{
					
					$location.path("/admin");
				}
				
			}
			else{
				errors = true;
				callback(errors);
			}
		})
	}
	return functions;
})

