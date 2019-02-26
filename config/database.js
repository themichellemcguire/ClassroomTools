var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/home',
{useNewUrlParser: true}
);

var db = mongoose.connection;

db.on('connected', function() {
    console.log(`connected to MongoDB ${db.host}:${db.port}`);
});