var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://themichellemcguire:s-B-Vw-DfQ6xkHV@cluster0-vdq9s.mongodb.net/ClassroomTools?retryWrites=true',
    {useNewUrlParser: true}
    );

var db = mongoose.connection;

db.on('connected', function() {
    console.log(`connected to MongoDB ${db.host}:${db.port}`);
});

