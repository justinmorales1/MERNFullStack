const mongoose = require('mongoose');
//const Schema = mongoose.Schema; This line is the same as the Schema underneath.
const { Schema } = mongoose;


const UserSchema = new Schema({
   googleId: String
});

mongoose.model('users', UserSchema);