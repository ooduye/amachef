var app = angular.module('amachef', ['ui.router', 'ngStorage'])

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when('/home', '/home/allrecipes');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'partials/partial-home.html',
        controller: 'MainController'
      })

    .state('home.search', {
      url: '/search',
      templateUrl: 'partials/partial-home-search.html',
      controller: 'MainController'
    })

    .state('home.allrecipes', {
      url: '/allrecipes',
      templateUrl: 'partials/partial-home-recipes.html',
      controller: 'MainController'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'partials/partial-signup.html',
        controller: 'signupCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/partial-login.html',
        controller: 'loginCtrl'
      })
      .state('addrecipe', {
        url: '/addrecipe',
        templateUrl: 'partials/partial-addrecipe.html',
        controller: 'addRecipeCtrl'
      })
      .state('recipe', {
        url: '/recipe/:id',
        templateUrl: 'partials/partial-recipe.html',
        controller: 'MainController'
      })
      .state('userrecipes', {
        url: '/users/:id/recipes',
        templateUrl: 'partials/partial-userrecipes.html',
        controller: 'MainController'
      })
  })
  .run(['$rootScope', 'info', '$state', '$location', function($rootScope, info, $state, $location) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState) {
        if (info.getUser()) {
          if (toState.templateUrl == 'partials/partial-login.html') {
            $location.path('/');
          } else if (toState.templateUrl == 'partials/partial-signup.html') {
            $location.path('/');
          }
        } else if (toState.templateUrl == 'partials/partial-home.html') {

        } else if (toState.templateUrl == 'partials/partial-login.html' || toState.templateUrl == 'partials/partial-signup.html') {

        } else if (toState.templateUrl == 'partials/partial-addrecipe.html') {
          $location.path('/login');
        } else if (toState.templateUrl == 'partials/partial-recipe.html') {

        } else if (toState.templateUrl == 'partials/partial-userrecipes.html') {
          $location.path('/login');
        }
      })
  }]);
