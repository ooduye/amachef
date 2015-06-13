var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [RecipeSchema schema decription for database collection]
 * @type {Schema}
 */
var RecipeSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  cookTime: {
    type: String
  },
  ingredients: [{
    type: String
  }],
  method: [{
    type: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Recipe', RecipeSchema);
