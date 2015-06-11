app.controller("MainController", ["$scope", "info", function($scope, info) {
  
  info.isLoggedIn();

  $scope.getAllRecipes = function() {
    info.getRecipes(function(data) {
        $scope.recipes = data;
      },
      function() {
        console.log();
      });
  };

}]);

app.controller("signupCtrl", ["$scope", "info", function($scope, info) {
  $scope.signupUser = function() {
    var userDetails = {
      userName: $scope.userName,
      password: $scope.password,
      email: $scope.email
    };

    info.signupUser(userDetails, function(data) {
        console.log(data);
        $scope.response = data;
      },
      function() {
        console.log();
      });
  };
}]);

app.controller("loginCtrl", ["$scope", "info", "$window", '$rootScope', function($scope, info, $window, $rootScope) {
  info.isLoggedIn();
  $scope.loginUser = function() {
    info.loginUser($scope.user, function(data) {
        $window.localStorage.setItem('token', data);
        info.isLoggedIn();
        window.location = '/';
      },
      function(err) {
        $scope.errorMessage = 'Incorrect Username or Password';
      });

  };

}]);

app.controller("navCtrl", ["$scope", "info", "$window", "$rootScope", function($scope, info, $window, $rootScope) {
  $rootScope.logoutUser = function() {
    info.logoutUser(function(data) {
        $window.localStorage.setItem('token', null);
        $scope.recipes = data;
        $rootScope.isLogged = false;
      },
      function() {
        console.log();
      });
  };
}])
