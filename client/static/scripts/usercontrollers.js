angular.controller("user_controller", function($scope, $cookies, $cookieStore, $location, userfactory){
	$scope.errors = false;
	$scope.done = false;
	$scope.box = {};
	
	
	if($cookies._id === undefined){
		$location.path("/");
	}
	else if($cookies.admin == '"True"'){
		$location.path("/");
	}
	else{
		$scope.user = $cookies.username.replace(/['"]+/g, '');
	}

	$scope.logout = function(){
		for(cookie in $cookies){
			$cookieStore.remove(cookie);	
		} 
		$location.path("/");
	}

	$scope.addinfo = function(){
		$scope.done = false;
		userfactory.updateinfo($scope.box, function(callback){
			$scope.done = callback;
		});
	}
	$scope.addpage = function(){
		$location.path('/add');
	}
	$scope.goprofile = function(){
		$location.path('/profile');
	}
})



///ADMIN STUFF BELOW








angular.controller("admin_controller", function($scope, $cookies, $cookieStore, $location, userfactory){
	if($cookies._id === undefined){
		$location.path("/");
	}
	else if($cookies.admin == '"False"'){
		$location.path("/");
	}
	else{
		$scope.user = $cookies.username.replace(/['"]+/g, '');
	}
	$scope.calendarView = "month";
	$scope.events = [];
	$scope.viewDate = "month";

	$scope.users = [];
	//pulling user list
	console.log("pulling users");
	userfactory.pullusers(function(callback){
		$scope.users = callback;
		console.log($scope.users);
	});
	$scope.logout = function(){
		for(cookie in $cookies){
			$cookieStore.remove(cookie);	
		} 
		$location.path("/");
	}

})
















