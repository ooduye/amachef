app.controller("MainController", ["$http", "$scope", "info", "$location", "$rootScope", "$localStorage",'$stateParams', function($http, $scope, info, $location, $rootScope, $localStorage,$stateParams) {

  // console.log($stateParams.rid);
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
    // console.log(2,index);
    $rootScope.recipeId = $scope.recipes[index]._id;
    $scope.url = "/recipe/" + $rootScope.recipeId;
    $http.get('/api/recipes/' + $rootScope.recipeId)
    .success(function(data) {
      $rootScope.oneRecipe = data;
      $location.path($scope.url);
    })
    .error(function(err) {
      console.log("an error occured: ", err);
    });
  };

  $rootScope.getUserRecipes = function(){
    $rootScope.userid = $localStorage.user._id;
    $scope.url = "/users/" + $rootScope.userid + "/recipes";
    $http.get('/api/users/' + $rootScope.userid + '/recipes')
    .success(function(data) {
      $rootScope.userRecipes = data;
      $location.path($scope.url);
    })
    .error(function(err) {
      console.log("an error occured: ", err);
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

app.controller("addRecipeCtrl", ["$scope", "info", "$localStorage", function($scope, info, $localStorage) {
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
app.controller("recipeCtrl",['$scope','$stateParams','$http',function($scope,$stateParams,$http){
    // console.log(2,index);
    
    $scope.recipeId = $stateParams.rid;
    // $scope.url = "/recipe/" + $scope.recipeId;
    console.log("im here");
    $http.get('/api/recipes/' + $scope.recipeId)
    .success(function(data) {
      $scope.oneRecipe = data;
      // $location.path($scope.url);
    })
    .error(function(err) {
      console.log("an error occured: ", err);
    });
}])
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
