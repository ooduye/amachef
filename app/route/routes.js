var recipe = require('../controller/controller.recipe');
var user = require('../controller/controller.user');
// require('./config/passport')(passport); // pass passport for configuration


// expose the routes to our app with module.exports
module.exports = function(app, passport) {

  // api ---------------------------------------------------------------------
  // get all recipes
  app.get('/api/recipes', recipe.getAllRecipes);
  app.get('/api/recipe', recipe.getReqRecipes);
  app.get('/api/recipes/:recipe_id', recipe.getRecipe);
  app.get('/api/users/', user.isLoggedIn, user.getAllUsers);

  // create recipe and send back all recipes after creation
  app.post('/api/recipes', user.isLoggedIn, recipe.createNewRecipe);

  // create a new user, process the signup form
  app.post('/api/signup', passport.authenticate('local-signup', {failureFlash: true}), user.createNewUser);

  app.post('/api/login', passport.authenticate('local-login', {
    failureFlash: true
  }), user.loginUser);

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  app.get('/api/logout', user.logoutUser);


  // edit a recipe
  app.put('/api/recipes/:recipe_id', user.isLoggedIn, recipe.editRecipe);
  app.put('/api/users/:user_id', user.isLoggedIn, user.editUser);


  // delete a recipe
  app.delete('/api/recipes/:recipe_id', user.isLoggedIn, recipe.deleteRecipe);
  app.delete('/api/users/:user_id', user.isLoggedIn, user.deleteUser);

  // login a user
  // app.post('/api/login', passport.authenticate('local-signup', {
  //   successRedirect: res.json({message: 'you have been logged in'});
  // }))



  app.get('*', recipe.otherwise);
  app.get('*', user.otherwise);



};
