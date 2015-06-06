var recipe = require('../controller/controller.recipe');
var user = require('../controller/controller.user');
// require('./config/passport')(passport); // pass passport for configuration


// expose the routes to our app with module.exports
module.exports = function(app, passport) {

  // api ---------------------------------------------------------------------
  // get all recipes
  app.get('/api/recipes', recipe.getAllRecipes);
  app.get('/api/recipes/:recipe_id', recipe.getRecipe);
  app.get('/api/users/', user.getAllUsers);

  // create recipe and send back all recipes after creation
  app.post('/api/recipes', recipe.createNewRecipe);
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
  app.post('/api/login', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.post('/login',
  passport.authenticate('local-signup'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({message: "User has been authenticated"});
  });


  app.get('*', recipe.otherwise);
  app.get('*', user.otherwise);

};
