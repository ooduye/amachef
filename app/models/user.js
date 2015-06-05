var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [UserSchema schema decription for database collection]
 * @type {Schema}
 */
var UserSchema = new Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
})

module.exports = mongoose.model('User', UserSchema);
