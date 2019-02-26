var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Teacher = require('../models/teacher');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    Teacher.findOne({ 'googleId': profile.id }, function(err, teacher) {
      if (err) return cb(err);
      if (teacher) {
        return cb(null, teacher);
      } else {
        // we have a new teacher via OAuth!
        var newTeacher = new Teacher({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newTeacher.save(function(err) {
          if (err) return cb(err);
          return cb(null, newTeacher);
        });
      }
    });
  }
));

passport.serializeUser(function(teacher, done) {
    done(null, teacher.id);
});
passport.deserializeUser(function(id, done) {
    Teacher.findById(id, function(err, teacher) {
      done(err, teacher);
    });
  });