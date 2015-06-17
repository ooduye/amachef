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


app.controller("signupCtrl", ["$scope", "info", "$location", function($scope, info, $location) {
  $scope.signupUser = function() {

    info.signupUser($scope.userDetails, function(data) {
        $scope.response = data;
        alert("You have been successfully signed up. Please login to continue.");
        $location.path('/login');
      },
      function(err) {
        $scope.errorMessage = 'Email already exists';
      });
  };
}]);

app.controller("addRecipeCtrl", ["$scope", "info", "$localStorage", "$location", function($scope, info, $localStorage, $location) {
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
        alert("Recipe has been added. Thank you for contributing!");
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
      
      // $scope.noRecipe = "";      
      // console.log(data);
      // if ((data.name === 'CastError')) {
      //   $scope.noRecipe = "CastError";
      //   $location.path('/');
      //   return;
      // }
      $scope.oneRecipe = data;
    })
    .error(function(err) {
      $scope.errorMessage = 'An Error Occured';
    });
}]);

app.controller("userCtrl", ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
  $scope.userid = $stateParams.uid;
  $http.get('/api/users/' + $scope.userid + '/recipes')
    .success(function(data) {
      $scope.userRecipes = data;
    })
    .error(function(err) {
      $scope.errorMessage = 'An Error Occured';
    });
}]);

app.controller("loginCtrl", ["$scope", "info", '$rootScope', '$location', function($scope, info, $rootScope, $location) {

  $scope.loginUser = function() {
    info.loginUser($scope.user, function(data) {

        info.login(data);
        alert("You have been successfully logged in.");
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
        alert("You have been successfully logged out");
        $location.path('/');

        $rootScope.current_user = info.getUser();

        $scope.recipes = data;
      },
      function(err) {
        $errorMessage = "Error logging out";
      });
  };
}])
