
var angular = angular.module('app', ['ngRoute','ngCookies']);


		//routing
        angular.config(function($routeProvider, $locationProvider){
        $routeProvider

        .when('/' , {
          templateUrl: 'static/partials/main.html'
        })
        .when('/signup',{
          templateUrl: 'static/partials/signup.html'
        })
        .when('/profile',{
          templateUrl: 'static/partials/profile.html'
        })
        .when('/admin',{
          templateUrl: 'static/partials/admin.html'
        })
        .when('/add',{
          templateUrl: 'static/partials/add.html'
        })
        .otherwise({
          redirectTo: '/'
        });

      });



  angular.directive('dhxScheduler', function() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',

    link:function ($scope, $element, $attrs, $controller){
      //adjust size of a scheduler
      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        scheduler.setCurrentView();
      });

      //styling for dhtmlx scheduler
      $element.addClass("dhx_cal_container");

      //init scheduler
      scheduler.init($element[0], new Date(), "month");
    }
  }
})


        //controllers

  angular.controller("signup_controller", function($scope,userfactory, $location){
      $scope.samename = false;
      $scope.notmatched = false;
      $scope.success = false;
      $scope.special = false;
      $scope.box = {};

      $scope.signin = function(){
        $scope.samename = false;
        $scope.notmatched = false;
        $scope.success = false;
        $scope.special = false;
       
        if ($scope.box.repassword != $scope.box.password){
            $scope.notmatched = true;
        }
    
        else{
          console.log("get here");
          userfactory.adduser($scope.box, function(callback){
            
            if(callback == "samename"){
              $scope.samename = true;
            }
            else if (callback == "special"){
              $scope.special = true;
            }
            else{
              $scope.success = true;
            }
          });

        }

      }
      $scope.gohome = function(){
        $location.path('/main');
        
      }
  })

	

  angular.factory("userfactory", function($http, $cookies){
      var errors = "";
     
      var functions = {};

      functions.adduser = function (data, callback){
        $http.post('/adduser', data).success(function(result){
          if (result == "samename"){
            errors = "samename";
            callback(errors);
          }
          else if (result == "special"){
            errors = "special";
            callback(errors);
          }
          else{
            callback("Success");
          }
        })
      }


      functions.updateinfo = function(data,callback){
        var done= false;
        var id = $cookies._id;
        var users = [];
      
        
        $http.post('/updateinfo/'+id, data).success(function(result){
          
          console.log('finished updating');
          done = true;
          callback(done);
        })
      }

      functions.pullusers = function(callback){
        $http.get('/getallusers').success(function(result){
          console.log("finished getting");
          users = result;
          callback(users);
        })
      }



  
  


      return functions;
  })



































