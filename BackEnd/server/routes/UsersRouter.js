const passport = require('passport');
const express = require('express');
const router = express.Router();


const User = require('../models/user');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        class: req.body.class
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});


// Update User: Name
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.updateData({id: req.user._id,  name: req.body.name, email: req.body.email}, (err) => {

        if (err) {
            res.json({success: false, code:400, status:'update_failed'});
        }
        else {
            res.json({success: true,  code:200, status:'update_successful'});
        }

    });

});


// Update User: Password
router.post('/updatePassword', passport.authenticate('jwt', {session: false}), (req, res) => {

    let newPassword = req.body.password;

    // if (err)            return res.json ({success: false, code: 400, status:'missing_user_id'});
    if (!req.user)      return res.json ({success: false, code: 404, status:'user_not_found'});
    if (!newPassword)   return res.json ({success: false, code: 400, status:'invalid_new_password'});

    User.comparePassword(req.body.oldPassword, req.user.password, (err, isMatch) => {

        if (err)        return res.json ({success: false, code: 400, status:'invalid_old_password'});
        if (!isMatch)   return res.json ({success: false, code: 404, status:'wrong_password'});

        User.updatePassword({id: req.body._id, password: req.body.password}, (err) => {

            if (err)    return res.json ({success: false, code: 404, status:'password_update_failed'});
            else        return res.json ({success: true,  code: 200, status:'password_updated'});

        });
    });
});


// Profile
router.get('/current-user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});



router.get('/find', (req, res) => {

    let query = object.assign({}, req.query);

    console.log('Requested -> User profile of: ' + JSON.stringify(query));

    if (query.username)

        User.getUserByUsername(query.username, (err, user) => {

            flushUser(err, user, res);

        });

    else if (query.email)

        User.getUserByEmail(query.email, (err, user) => {

            flushUser(err, user, res);

        });

    else

        res.json({success: false, code: 404, status:'invalid_query_specified'});
});


function flushUser(err, user, res) {
    if (err) throw err;
    if (!user) {
        return res.json({success: false, code: 400, status:'user_not_found'});
    }

    res.json({success: true, user: user});
}


// Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});


module.exports = router;
