app.factory('info', ['$http', '$rootScope', '$window', function($http, $rootScope, $window) {
  return {
    getRecipes: function(success, error) {
      $http.get('/api/recipes').success(success).error(error);
    },

    signupUser: function(userDetails, success, error) {
      $http.post('/api/signup', userDetails).success(success).error(error);
    },

    loginUser: function(loginDetails, success, error) {
      $http.post('/api/login', loginDetails).success(success).error(error);
    },

    logoutUser: function(success, error) {
      $http.get('/api/logout').success(success).error(error);
    },

    isLoggedIn: function() {
      if ($window.localStorage.getItem('token') === 'null') {
        $rootScope.isLogged = false;
      } else {
        $rootScope.isLogged = true;
      }

    }
  }
}]);
