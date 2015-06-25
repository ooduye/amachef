var Recipe = require('../models/recipe');
/**
 * [exports makes all the functions accessible by other]
 * @type {Object}
 */
module.exports = {
  /**
   * [getAllRecipes gets all the recipes in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllRecipes: function(req, res) {

    // use mongoose to get all recipes in the database
    Recipe.find(function(err, recipes) {

      // if there is an error retrieving, send t∏he error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      return res.json(recipes); // return all recipes in JSON format
    });
  },
  getReqRecipes: function(req, res) {

    Recipe.find({
      ingredients: {
        $in: [req.query.firstItem, req.query.secondItem, req.query.thirdItem, req.query.fourthItem, req.query.fifthItem, req.query.sixthItem, req.query.seventhItem, req.query.eighthItem, req.query.ninthItem, req.query.tenthItem]
      }
    }, function(err, recipe) {
      if (err) {
        res.json({
          message: "Server Error"
        });
      }
      if (recipe) {
        if (recipe.length === 0) {
          res.json({
            message: "No possible combination"
          })
        } else if (recipe.length > 0) {
          return res.json(recipe);
        }
      }

    });
  },

  /**
   * [getRecipe gets a particular recipe in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err)
      return res.json(recipe);
    });
  },
  /**
   * [createNewRecipe creates a new recipe in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createNewRecipe: function(req, res) {

    // create a recipe, information comes from AJAX request from Angular
    Recipe.create({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients,
      method: req.body.method,
      user: req.body.user
    }, function(err, recipe) {
      if (err)
        res.send(err);

      // get and return all the recipes after you create another
      Recipe.find(function(err, recipes) {
        if (err)
          res.send(err)
        res.json(recipes);
      });
    });

  },
  /**
   * [editRecipe editis a particular recipe in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  editRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);

      recipe.name = req.body.name;
      recipe.imageUrl = req.body.imageUrl;
      recipe.category = req.body.category;
      recipe.cookTime = req.body.cookTime;
      recipe.ingredients = req.body.ingredients;
      recipe.method = req.body.method;

      // get and return all the recipes after you create another
      recipe.save(function(err, recipes) {
        if (err) {
          res.send(err)
        }

        res.json({
          message: 'Saved'
        });
      });
    });
  },
  /**
   * [deleteRecipe deletes a particula recipe in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteRecipe: function(req, res) {
    Recipe.remove({
      _id: req.params.recipe_id
    }, function(err, recipe) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  },
  /**
   * [otherwise default refer page if no known function is returned]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  otherwise: function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  }

};
