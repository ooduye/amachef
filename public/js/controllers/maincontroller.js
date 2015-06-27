app.controller("MainController", ["$http", "$scope", "info", "$location", "$rootScope", "$localStorage", '$stateParams', function($http, $scope, info, $location, $rootScope, $localStorage, $stateParams) {

  $scope.currentPage = 1;
  $scope.pageSize = 15;

  $scope.current_user = info.getUser();

  $scope.getReqRecipes = function() {

    $scope.nullErrorMessage = '';

    if (!$scope.firstItem) {
      $scope.nullErrorMessage = "Search Field empty.";
      return;
    }

    $scope.searchArray = ($scope.firstItem.toLowerCase()).split(',');

    $http.get('/api/recipe?firstItem=' + $scope.searchArray[0] + '&secondItem=' + $scope.searchArray[1] + '&thirdItem=' + $scope.searchArray[2] + '&fourthItem=' + $scope.searchArray[3] + '&fifthItem=' + $scope.searchArray[4] + '&sixthItem=' + $scope.searchArray[5] + '&seventhItem=' + $scope.searchArray[6] + '&eighthItem=' + $scope.searchArray[7] + '&ninthItem=' + $scope.searchArray[8] + '&tenthItem=' + $scope.searchArray[9])
      .success(function(data) {
        $scope.noCombination = "";
        if ((data.message === 'No possible combination')) {
          $scope.noCombination = "No possible combination exists... Sorry!!";
          return;
        }
        $scope.recipes = data;
      })
      .error(function(err) {
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
    $scope.ingredients = $scope.ingredients.split(', ').join(',');
    $scope.method = $scope.method.split('. ').join('.');
    $scope.method = $scope.method.replace(/\.$/, "");
    var newRecipe = {
      name: $scope.name,
      imageUrl: $scope.imageUrl,
      category: $scope.category,
      cookTime: $scope.cookTime,
      ingredients: ($scope.ingredients.toLowerCase()).split(','),
      method: ($scope.method).split('.'),
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

app.controller("userCtrl", ['$scope', '$stateParams', '$http', '$location', "toastr", function($scope, $stateParams, $http, $location, toastr) {
  $scope.currentPage = 1;
  $scope.pageSize = 15;

  $scope.noNewRecipe = '';

  $scope.userid = $stateParams.uid;
  $http.get('/api/users/' + $scope.userid + '/recipes')
    .success(function(data) {
      if ((data.message === "Error getting recipes.")) {
        $location.path('/');
        return;
      }
      if(data.length === 0){
        $scope.noNewRecipe = 'You have no recipe';
        return;
      }
      $scope.userRecipes = data;
    })
    .error(function(err) {
      $scope.errorMessage = 'An Error Occured';
    });

  $scope.editRecipe = function(recipe) {
    $scope.editing = {};
    $scope.editing.id = recipe._id;
    $scope.editing.imageUrl = recipe.imageUrl;
    $scope.editing.name = recipe.name;
    $scope.editing.category = recipe.category;
    $scope.editing.cookTime = recipe.cookTime;
    $scope.editing.ingredients = recipe.ingredients.join(); 
    $scope.editing.method = recipe.method.join(".");
  }

  $scope.saveEdittedRecipe = function() {

    $scope.editing.ingredients = $scope.editing.ingredients.split(', ').join(',');
    $scope.editing.method = $scope.editing.method.split('. ').join('.');
    $scope.editing.method = $scope.editing.method.replace(/\.$/, "");

     $scope.editing = {
      _id: $scope.editing.id,
      name: $scope.editing.name,
      imageUrl: $scope.editing.imageUrl,
      category: $scope.editing.category,
      cookTime: $scope.editing.cookTime,
      ingredients: ($scope.editing.ingredients.toLowerCase()).split(','),
      method: ($scope.editing.method).split('.')
    }

    $http.put('/api/recipes/' + $scope.editing._id, $scope.editing)
      .success(function(data) {
        if (data.message === 'Saved') {
          $http.get('/api/users/' + $scope.userid + '/recipes').success(function(data) {
            $scope.userRecipes = data;
          });
        }
      })
      .error(function(err) {
        console.log(err);
      })
    $('#closeEditModal').click();
  }

  $scope.deleteRecipe = function(recipeId, index) {

    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this recipe!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function() {
      $http.delete('api/recipes/' + recipeId)
        .success(function(data) {
          $scope.userRecipes.splice(index, 1);
          swal("Deleted!", "Recipe has been deleted.", "success");
        })
        .error(function(err) {
          console.log('error:', err);
        });
    });




  };
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
