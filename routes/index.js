var express = require('express');
var router = express.Router();
var passport = require('passport');

var Teacher = require('../models/teacher');
var Student = require('../models/student');

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


// GET /home to list all students
// this will be an index view
router.get('/home', function(req, res) {
  Student.find({}, function(err, students) {
    res.render("home", {
      teacher: req.user,
      students: students
    });
  })
});

// GET /home/new home.new to provide form for submitting new students to the create action
// this will be a redirect
router.get('/home/new', function(req, res) {
  console.log("new form");
  res.render('./new')
  
});
router.post('/home/new', function(req, res) {
  Student.create(req.body, function(err,student){
      if (err){
        res.redirect('/home')
      }else{
        res.redirect('/home');
        console.log(student);
      } 
     }) 
   });
router.get('/home/:id', function(req, res) {
Student.findById(req.params.id, function(err, student){
    if (err) res.redirect('/home')
    console.log( student)
      res.render('show', {student})
    }) 
  });

router.put('/edit/:id', function(req, res){
  console.log(req.params.id, "This is the Id of the student we're updating")
  console.log(req.body, "This is updated information of the student")
  Student.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(error, updatedStudent){
      console.log(updatedStudent, " This is the updated student")
      res.redirect('/edit')
  }) 
}); 
function updateStudent(req, res) {
  console.log(req.body, 'this is the update path')
  console.log(req.params.id)
  Student.findByIdAndUpdate(req.params.id, req.body, function(err, student){
        student.updated_at = Date.now();
        student.save( function ( err, student){
        });
        res.redirect( '/home' + req.params.id);
      });
  
}

router.delete('/home/:id', function(req, res){
console.log(req.params.id, 'Id in the delete route')
Student.findByIdAndRemove(req.params.id, function(error, deletedStudent){
    if(error){
        console.log(error)
    } else {
        console.log(deletedStudent, 'This Student was deleted')
        res.redirect('/home')
    }
  })
})
     
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

module.exports = router;


