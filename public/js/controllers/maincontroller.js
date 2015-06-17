app.controller("MainController", ["$http", "$scope", "info", "$location", "$rootScope", "$localStorage", '$stateParams', function($http, $scope, info, $location, $rootScope, $localStorage, $stateParams) {

  $scope.current_user = info.getUser();

  $scope.getReqRecipes = function() {

    $scope.nullErrorMessage = '';

    if (!$scope.firstItem) {
      $scope.nullErrorMessage = "Search Field empty.";
      return;
    }

    $scope.searchArray = ($scope.firstItem).split(',');

    $http.get('/api/recipe?firstItem=' + $scope.searchArray[0] + '&secondItem=' + $scope.searchArray[1] + '&thirdItem=' + $scope.searchArray[2] + '&fourthItem=' + $scope.searchArray[3] + '&fifthItem=' + $scope.searchArray[4] + '&sixthItem=' + $scope.searchArray[5] + '&seventhItem=' + $scope.searchArray[6] + '&eighthItem=' + $scope.searchArray[7] + '&ninthItem=' + $scope.searchArray[8] + '&tenthItem=' + $scope.searchArray[9])
      .success(function(data) {
        $scope.noCombination = "";
        console.log("yo: ", data);
        if ((data.message === 'No possible combination')){
          $scope.noCombination = "No possible combination exists... Sorry!!";
          return;
        }
        $scope.recipes = data;
      })
      .error(function(err) {
        console.log("your head is not correct");
        $scope.errorMessage = "No recipe found!!";
      });
    $scope.searchRecipes = "";
  };

  $scope.getAllRecipes = function() {
    info.getRecipes(function(data) {
        $scope.recipes = data;
      },
      function(err) {
        $scope.errorMessage = 'An Error Occured';
      });
  };

}]);


app.controller("signupCtrl", ["$scope", "info", "$location", "toastr", function($scope, info, $location, toastr) {
  $scope.signupUser = function() {

    info.signupUser($scope.userDetails, function(data) {
        $scope.response = data;
        toastr.success("Sign up successful. Please login to continue.");
        $location.path('/login');
      },
      function(err) {
        $scope.errorMessage = 'Email already exists';
      });
  };
}]);

app.controller("addRecipeCtrl", ["$scope", "info", "$localStorage", "$location", "toastr", function($scope, info, $localStorage, $location, toastr) {
  $scope.addNewRecipe = function() {
    $scope.user = $localStorage.user._id;
    var newRecipe = {
      name: $scope.name,
      category: $scope.category,
      cookTime: $scope.cookTime,
      ingredients: ($scope.ingredients).split(','),
      method: ($scope.method).split(','),
      user: $scope.user
    };
    info.addNewRecipe(newRecipe, function(data) {
        $scope.response = data;
        toastr.success("Recipe has been added. Thank you for contributing!");
        $location.path('/');
      },
      function(err) {
        $scope.errorMessage = 'Error creating recipe';
      });
  };
}]);

app.controller("recipeCtrl", ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {

  $scope.recipeId = $stateParams.rid;
  $http.get('/api/recipes/' + $scope.recipeId)
    .success(function(data) {

      if ((data.name === 'CastError')) {
        $location.path('/');
        return;
      }
      $scope.oneRecipe = data;
    })
    .error(function(err) {
      $scope.errorMessage = 'An Error Occured';
    });
}]);

app.controller("userCtrl", ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {
  $scope.userid = $stateParams.uid;
  $http.get('/api/users/' + $scope.userid + '/recipes')
    .success(function(data) {

      if ((data.message === "Error getting recipes.")) {
        $location.path('/');
        return;
      }
      $scope.userRecipes = data;
    })
    .error(function(err) {
      $scope.errorMessage = 'An Error Occured';
    });
}]);

app.controller("loginCtrl", ["$scope", "info", '$rootScope', '$location', "toastr", function($scope, info, $rootScope, $location, toastr) {

  $scope.loginUser = function() {
    info.loginUser($scope.user, function(data) {

        info.login(data);
        toastr.success("Login successfully.");
        $location.path('/');
        $rootScope.current_user = info.getUser();
      },
      function(err) {
        $scope.errorMessage = 'Incorrect Username or Password';
      });

  };

}]);

app.controller("navCtrl", ["$scope", "info", "$localStorage", "$rootScope", "$location", "toastr", function($scope, info, $localStorage, $rootScope, $location, toastr) {

  $rootScope.current_user = info.getUser();

  $rootScope.logoutUser = function() {
    info.logoutUser(function(data) {
        $localStorage.user = 'null';
        toastr.success("Logout successfully");
        $location.path('/');

        $rootScope.current_user = info.getUser();

        $scope.recipes = data;
      },
      function(err) {
        $errorMessage = "Error logging out";
      });
  };
}])
