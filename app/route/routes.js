var recipe = require('../controller/controller.recipe');
var user = require('../controller/controller.user');
// require('./config/passport')(passport); // pass passport for configuration


// expose the routes to our app with module.exports
module.exports = function(app, passport) {

  // api ---------------------------------------------------------------------
  // get all recipes
  app.get('/api/recipes', recipe.getAllRecipes);
  app.get('/api/recipes/:recipe_id', recipe.getRecipe);
  app.get('/api/users/', isLoggedIn, user.getAllUsers);

  // create recipe and send back all recipes after creation
  app.post('/api/recipes', isLoggedIn, recipe.createNewRecipe);
  // app.post('/api/users', user.createNewUser);

  // edit a recipe
  app.put('/api/recipes/:recipe_id', recipe.editRecipe);
  app.put('/api/users/:user_id', user.editUser);


  // delete a recipe
  app.delete('/api/recipes/:recipe_id', recipe.deleteRecipe);
  app.delete('/api/users/:user_id', user.deleteUser);

  // login a user
  // app.post('/api/login', passport.authenticate('local-signup', {
  //   successRedirect: res.json({message: 'you have been logged in'});
  // }))

  // process the signup form
  app.post('/api/signup',
    passport.authenticate('local-signup'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.json(req.user);
    });

  app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
    res.json(req.user)
  });

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.send('user has been logged out');
  });


  app.get('*', recipe.otherwise);
  app.get('*', user.otherwise);

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.send('unauthorized');
  }

};
