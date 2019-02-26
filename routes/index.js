var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-Classroom Tools' });
});
 // Google OAuth login route
 router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
 // Google OAuth callback route
 router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/home',
    failureRedirect : '/'
  }
));
 // OAuth logout route
 router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
// GET /home/new to create new students
// this will be a redirect

// GET /home to list all students
// this will be an index view
router.get('/home', function(req, res) {
  console.log("it's working");
});

// GET /home/new home.new to provide form for submitting new students to the create action
// this will be a redirect
router.get('/home/new', function(req, res) {
  console.log("new form");
  res.render('./new')
  
});

// GET /home/:id/edit home.edit to provide form for editing a post and sending to the update action
// this will be a redirect

// DELETE /students/:id


 // Insert this middleware for routes that require a logged in user

var Teacher = require('../models/teacher');
var Student = require('../models/student');

function home(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Teacher.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Teacher.find(modelQuery)
  .sort(sortKey).exec(function(err, teachers) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('home', { teacher, name: req.query.name, sortKey, user: req.user });
  });
};
 // Insert this middleware for routes that require a logged in user
 function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
};

// router.get('/home', function(req,res) {
  // we should have access to logged in user via req.user
  // req.user contains a user ID we can use to find inside mogodb
  // query mongoose for a teacher based on who is logged in
  // once teacher is found, we need to populate template with teacher data

  // res.render('home')
// });

// module.exports = {
//     home,
//     // new: newStudent
// };


// function newStudent(req, res) {
// res.render('students/new');
// }
module.exports = router;
