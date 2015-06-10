app.controller("navCtrl", ["$scope", function($scope) {
  $scope.loggedOut = true;
  $scope.loggedIn = false;
}]);

app.controller("MainController", ["$scope", "info", function($scope, info) {

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

app.controller("loginCtrl", ["$scope", "info", function($scope, info) {
  $scope.loginUser = function() {
    var loginDetails = {
      email: $scope.email,
      password: $scope.password
    };

    info.loginUser(loginDetails, function(data) {
        console.log(data);
      },
      function() {
        console.log();
      });

    $scope.loggedOut = !loggedOut;
    $scope.loggedIn = !loggedIn;

  };

  $scope.logoutUser = function() {
    info.logoutUser(function(data) {
        console.log(data);
        $scope.recipes = data;
      },
      function() {
        console.log();
      });
  };
}]);
