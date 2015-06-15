app.controller("MainController", ["$http", "$scope", "info", "$location", "$rootScope", function($http, $scope, info, $location, $rootScope) {

  $scope.current_user = info.getUser();

  $scope.getReqRecipes = function() {
    $scope.searchArray = ($scope.firstItem).split(',');

    $http.get('/api/recipe?firstItem=' + $scope.searchArray[0] + '&secondItem=' + $scope.searchArray[1] + '&thirdItem=' + $scope.searchArray[2] + '&fourthItem=' + $scope.searchArray[3] + '&fifthItem=' + $scope.searchArray[4] + '&sixthItem=' + $scope.searchArray[5] + '&seventhItem=' + $scope.searchArray[6] + '&eighthItem=' + $scope.searchArray[7] + '&ninthItem=' + $scope.searchArray[8] + '&tenthItem=' + $scope.searchArray[9])
      .success(function(data) {
        $scope.recipes = data;
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

  $rootScope.getOneRecipe = function(index){
    $rootScope.recipeId = $scope.recipes[index]._id;
    $scope.url = "/recipe/" + $rootScope.recipeId;
    $http.get('/api/recipes/' + $rootScope.recipeId)
    .success(function(data) {
      $rootScope.oneRecipe = data;
      $location.path($scope.url);
    })
    .error(function(err) {
      console.log("an error occured: ", err);
    })
    
  }

}]);


app.controller("signupCtrl", ["$scope", "info", "$location", function($scope, info, $location) {
  $scope.signupUser = function() {

    info.signupUser($scope.userDetails, function(data) {
        $scope.response = data;
        $location.path('/login');
      },
      function() {
        console.log();
      });
  };
}]);

app.controller("addRecipeCtrl", ["$scope", "info", "$localStorage", function($scope, info, $localStorage) {
  $scope.addNewRecipe = function() {
    var newRecipe = {
      name: $scope.name,
      category: $scope.category,
      cookTime: $scope.cookTime,
      ingredients: ($scope.ingredients).split(','),
      method: ($scope.method).split(','),
      user: $localStorage.user._id
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
