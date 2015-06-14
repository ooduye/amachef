app.controller("MainController", ["$http", "$scope", "info", function($http, $scope, info) {

  $scope.current_user = info.getUser();

  $scope.getReqRecipes = function() {
    $http.get('/api/recipe?firstItem=' + $scope.firstItem + '&secondItem=' + $scope.secondItem + '&thirdItem=' + $scope.thirdItem)
      .success(function(data) {
        $scope.searchRecipes = data;
      })
      .error(function(err) {
        console.log("an error occured: ", err);
      });
    $scope.searchRecipes = "";
  };

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

    info.signupUser($scope.userDetails, function(data) {
        console.log(data);
        $scope.response = data;
      },
      function() {
        console.log();
      });
  };
}]);

app.controller("addRecipeCtrl", ["$scope", "info", function($scope, info) {
  $scope.addNewRecipe = function() {
    var newRecipe = {
      name: $scope.name,
      category: $scope.category,
      cookTime: $scope.cookTime,
      ingredients: ($scope.ingredients).split(','),
      method: ($scope.method).split(',')
    };
    info.addNewRecipe(newRecipe, function(data) {
      $scope.response = data;
    },
    function() {
      console.log();
    });
  };
}]);

app.controller("loginCtrl", ["$scope", "info", '$rootScope', '$location', function($scope, info, $rootScope, $location) {

  $scope.loginUser = function() {
    info.loginUser($scope.user, function(data) {

        info.login(data);
        $location.path('/');
        $rootScope.current_user = info.getUser();
      },
      function(err) {
        $scope.errorMessage = 'Incorrect Username or Password';
      });

  };

}]);

app.controller("navCtrl", ["$scope", "info", "$localStorage", "$rootScope", "$location", function($scope, info, $localStorage, $rootScope, $location) {

  $rootScope.current_user = info.getUser();

  $rootScope.logoutUser = function() {
    info.logoutUser(function(data) {
        $localStorage.user = 'null';

        $location.path('/');

        $rootScope.current_user = info.getUser();

        $scope.recipes = data;
        $rootScope.isLogged = false;
      },
      function() {
        console.log();
      });
  };
}])
