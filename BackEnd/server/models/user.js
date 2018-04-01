const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    class: String
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};


module.exports.updateData = function (update, callback) {

    let newData = {};

    if (update.name)
        newData.name = update.name;
    if (update.email)
        newData.email = update.email;

    User.update({_id: update.id}, newData, callback);
};

module.exports.updatePassword = function (update, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(update.password, salt, (err, hash) => {

            if (err)

                callback(err, null);

            else

                User.update({_id: update.id}, {password: hash}, callback);

        });
    });
};

module.exports.updateUserClass = function (update, callback) {
    User.update({_id: update.id}, {class: update.class}, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
}


module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.getClassById = function (id, callback) {
    User.findOne({_id: id}, callback).select('class -_id');

}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {

    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {

        if (err) callback(err,  false);
        else     callback(null, isMatch);

    });
};
