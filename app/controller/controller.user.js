var User = require('../models/user');
var Recipe = require('../models/recipe');

/**
 * [exports makes all the functions accessible by other files]
 * @type {Object}
 */
module.exports = {

  getAllUsers: function(req, res) {

    // use mongoose to get all users in the database
    User.find(function(err, users) {

      // if there is an error retrieving, send t∏he error. nothing after res.send(err) will execute
      if (err) {
        res.json({
          message: 'Error getting users.'
        });
      }
      res.json(users); // return all recipes in JSON format
    });
  },

  getUserRecipes: function(req, res, next) {
    Recipe.find({
      user: req.params.user_id
    }, function(err, recipe) {
      if (err) {
        res.json({
          message: 'Error getting recipes.'
        });
      }
      if (recipe) {
        return res.json(recipe);
      }
      next();
    });
  },
  /**
   * [createNewUser creates a new user in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createNewUser: function(req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  },


  loginUser: function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    
    res.json(req.user);
  },

  logoutUser: function(req, res) {
    req.logout();
    res.send('user has been logged out');
  },
  /**
   * [editUser editis a particular user in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  editUser: function(req, res, next) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

      user.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;
      user.userImageUrl = req.body.userImageUrl;

      // get and return all the users after you create another
      user.save(function(err, users) {
        if (err) {
          res.json({
            message: 'User update failed'
          });
        } else {
          res.json({
            message: 'User updated!'
          });
        }
      });
      next();
    });
  },
  /**
   * [deleteUser deletes a particula user in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteUser: function(req, res, next) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);

      // get and return all the users after you create another
      User.find(function(err, users) {
        if (err)
          res.send(err)
        res.json(users);
      });
      next();
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
  },

  // route middleware to make sure a user is logged in
  isLoggedIn: function(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    // res.send('unauthorized');
    res.json({message: "Unauthorized Access"});
  }

};
