app.factory('info', ['$http', '$rootScope', '$localStorage', function($http, $rootScope, $localStorage) {

  return { 
    
    getRecipes: function(success, error) {
      $http.get('/api/recipes').success(success).error(error);
    },

    signupUser: function(userDetails, success, error) {
      $http.post('/api/signup', userDetails).success(success).error(error);
    },

    addNewRecipe: function(newRecipe, success, error) {
      $http.post('/api/recipes', newRecipe).success(success).error(error);
    },

    loginUser: function(loginDetails, success, error) {
      $http.post('/api/login', loginDetails).success(success).error(error);
    },

    logoutUser: function(success, error) {
      $http.get('/api/logout').success(success).error(error);
    },

    getUser: function() {
      var user = $localStorage.user;
      if (user == 'null')
        user = false
      return user
    },

    login: function(user) {
      console.log(user);
      $localStorage.user = user;
      console.log($localStorage.user);
    }
  }
}]);


