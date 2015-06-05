var recipe = require('../controller/controller.recipe');
var user = require('../controller/controller.user');

// expose the routes to our app with module.exports
module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all recipes
  app.get('/api/recipes', recipe.getAllRecipes);
  app.get('/api/recipes/:recipe_id', recipe.getRecipe);
  app.get('/api/users/', user.getAllUsers);

  // create recipe and send back all recipes after creation
  app.post('/api/recipes', recipe.createNewRecipe);
  app.post('/api/users', user.createNewUser);

  // edit a recipe
  app.put('/api/recipes/:recipe_id', recipe.editRecipe);
  app.put('/api/users/:user_id', user.editUser);


  // delete a recipe
  app.delete('/api/recipes/:recipe_id', recipe.deleteRecipe);
  app.delete('/api/users/:user_id', user.deleteUser);


  app.get('*', recipe.otherwise);
  app.get('*', user.otherwise);

};
