var app = angular.module('amachef', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/partial-home.html',
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

})