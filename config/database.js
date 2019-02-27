var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser: true}
    );

var db = mongoose.connection;

db.on('connected', function() {
    console.log(`connected to MongoDB ${db.host}:${db.port}`);
});