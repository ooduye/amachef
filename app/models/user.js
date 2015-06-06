var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
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

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
