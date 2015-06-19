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
    var newRecipe = {
      name: $scope.name,
      category: $scope.category,
      cookTime: $scope.cookTime,
      ingredients: ($scope.ingredients.toLowerCase()).split(','),
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

  // var myImage = document.getElementById("myPhoto");
  // var imageArray = ["../images/tip.jpg", "../images/tip1.jpg", "../images/tip2.jpg", "../images/tip3.jpg", "../images/tip4.jpg", "../images/tip5.jpg", "../images/tip6.jpg", "../images/tip7.jpg", "../images/tip8.jpg", "../images/tip9.jpg"];
  // var imageIndex = 0;

  // function changeImage() {
  //   myPhoto.setAttribute("src", imageArray[imageIndex]);
  //   imageIndex++;
  //   if (imageIndex >= imageArray.length) {
  //     imageIndex = 0;
  //   }
  // }

  // var intervalHandler = setInterval(changeImage, 3000);
  // myPhoto.onclick = function() {
  //   clearInterval(intervalHandler);
  // }



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
      // if ((data.message === "Unauthorized Access")) {
      //   $rootScope.current_user = info.getUser();
      //   toastr.warning('Please login again', 'Warning');
      //   $rootScope.logoutUser();
      //   $location.path('/login');
      // }
      $scope.userRecipes = data;
    })
    .error(function(err) {
      $scope.errorMessage = 'An Error Occured';
    });

  $scope.editRecipe = function(recipe) {
    $scope.editing = {};
    $scope.editing.id = recipe._id;
    $scope.editing.name = recipe.name;
    $scope.editing.category = recipe.category;
    $scope.editing.cookTime = recipe.cookTime;
    $scope.editing.ingredients = recipe.ingredients;
    $scope.editing.method = recipe.method;

  }

  $scope.saveEdittedRecipe = function() {
    $http.put('/api/recipes/' + $scope.editing.id, $scope.editing)
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
