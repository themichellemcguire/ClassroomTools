const mongoose = require('mongoose');
var teacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String
   }, {
     timestamps: true
   });

module.exports = mongoose.model('Teacher', teacherSchema)