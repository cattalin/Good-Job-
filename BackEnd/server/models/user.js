const mongoose = require( 'mongoose' );
const bcrypt   = require( 'bcryptjs' );

// User Schema
const UserSchema = mongoose.Schema( {
    name:           {
        type: String
    },
    email:          {
        type:     String,
        required: true
    },
    username:       {
        type:     String,
        required: true
    },
    password:       {
        type:     String,
        required: true
    },
    class:          String,
    uploadedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Video'
    }]
} );

let User = module.exports = mongoose.model( 'User', UserSchema );

User.getUserById = function(id, callback) {

    User.findById( id )
        .populate( 'uploadedVideos' )
        .exec( callback );

};


User.updateData = function(update, callback) {

    let newData = {};

    if(update.name) {
        newData.name = update.name;
    }
    if(update.email) {
        newData.email = update.email;
    }

    User.update( {_id: update.id}, newData, callback );
};

User.updatePassword = function(update, callback) {
    bcrypt.genSalt( 10, (err, salt) => {
        bcrypt.hash( update.password, salt, (err, hash) => {

            if(err) {
                callback( err, null );
            }
            else {
                User.update( {_id: update.id}, {password: hash}, callback );
            }

        } );
    } );
};

User.updateUserClass = function(update, callback) {
    User.update( {_id: update.id}, {class: update.class}, callback );
}

User.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne( query, callback );
}


User.getUserByEmail = function(email, callback) {
    const query = {email: email}
    User.findOne( query, callback );
}

User.getClassById = function(id, callback) {
    User.findOne( {_id: id}, callback ).select( 'class -_id' );

}

User.addUser = function(newUser, callback) {
    bcrypt.genSalt( 10, (err, salt) => {
        bcrypt.hash( newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save( callback );
        } );
    } );
};

User.comparePassword = function(candidatePassword, hash, callback) {

    bcrypt.compare( candidatePassword, hash, (err, isMatch) => {

        if(err) {
            callback( err, false );
        }
        else {
            callback( null, isMatch );
        }

    } );
};
