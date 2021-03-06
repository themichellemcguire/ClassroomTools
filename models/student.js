const mongoose = require('mongoose');

var medicalSchema = new mongoose.Schema({
  allergies: { type: Boolean, default: false },
  allergyDetails: String
});
var parentSchema = new mongoose.Schema({
  mom: { type: Boolean, default: true },
  dad: { type: Boolean, default: false },
  guardian: { type: Boolean, default: false },
  parentname: String,
  name: String,
  bestPhoneNumber: Number,
  otherPhoneNumber: Number
  }); 
var studentSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  birthdate: Date,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  // parentInfo: [parentSchema],
  // medicalInfo: [medicalSchema]
});


module.exports = mongoose.model('Student', studentSchema)