var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSchema = mongoose.Schema({
	street: {type: String}, 
	city: {type: String}, 
	state: {type: String}, 
	zip: {type: String}
},{ _id : false });

var UsersSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  password: {type: String},
  admin: {type: String},
  email: {type: String},
  phone: {type: String},
  address: [subSchema],
  hours: {type: Number}
  
},{versionKey: false});


mongoose.model("users", UsersSchema);