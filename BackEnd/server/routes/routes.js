const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Video = require('../models/video');
const Comment = require('../models/comment');
const Follow = require('../models/follow');

const RatingManager = require('../managers/ratingManager');
const SearchManager = require('../managers/searchManager');
const ClassManager = require('../managers/classManager');

/*
  -------------------COMMENT STUFF---------------------
*/

//post a comment
router.post('/postComment', (req, res, next) => {
    var newComment = {
        userId: req.body.userId,
        username: req.body.username,
        text: req.body.text,
        class: req.body.class,
        videoId: req.body.videoId
    }
    console.log(newComment);
    Comment.addComment(new Comment(newComment), (err, video) => {
        if (err) {
            res.json({success: false, msg: 'Failed to submit comment.'});
        }
        else {
            res.json({success: true, msg: 'Comment posted.'});
        }
    })
});


router.get('/comments', (req, res) => {
    let query = {
        videoId: req.query.videoId
    }
    Comment.getComments(query, (err, comments) => {
        if (err) throw err;
        if (!comments) {
            return res.json({success: false, msg: 'comments not found'});
        }
        comments.forEach(function (element) {
            console.log(element);
        }, this);

        res.json({success: true, comments: comments});
    })

})

/*
  -------------------VIDEO STUFF---------------------
*/





router.post('/deletecomm', (req, res, next) => {
    let todel = req.body._id;
    Comment.removeComment(todel, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to remove'});
        } else {
            res.json({success: true, msg: 'removed'});
        }
    })
});

router.get('/hasRated', (req, res, next) => {
    let query = {
        videoId: req.query.videoId,
        userId: req.query.userId,
    }

    RatingManager.hasRated(query, (err, result) => {
        if (err)
            res.json({success: false, msg: 'could not check the rating', result: 0});
        else {
            res.json({success: true, msg: 'rating found', result: result});
        }
    })
});


//update user class
router.get('/updateClass', (req, res, next) => {
    let query = {
        _id: req.query._id
    }
    ClassManager.updateUserClass(query, (err, result) => {
        if (err)
            res.json({success: false, msg: 'Could not update class', result: result});
        else {
            console.log("class checked");
            res.json({success: true, msg: 'class updated', result: result});
        }
    })
});


// Search stuff
router.get('/search', (req, res, next) => {
    const query = {
        sort: req.query.sort,
        select: req.query.select,
        limit: req.query.limit,
        skip: req.query.skip,
    }
    SearchManager.getVideosAndUsers(query, (err, videos) => {
        if (err) throw err;
        if (!videos) {
            return res.json({success: false, msg: 'Videos not found'});
        }

        res.json({success: true, videos: videos});

    })
});


router.get('/searchCount', (req, res) => {
    const query = {
        sort: req.query.sort,
        select: req.query.select,
        limit: req.query.limit,
        skip: req.query.skip,
    }
    SearchManager.countVideosAndUsers(query, (err, nrVideos) => {
        if (err) throw err;
        if (!nrVideos) {
            return res.json({success: false, msg: 'Videos not found'});
        }
        res.json({success: true, nrVideos: nrVideos});
    })
});


/*
  -------------------FOLLOWING STUFF---------------------
*/
router.post('/follow', (req, res, next) => {
    let follow = {
        followerId: req.body.followerId,
        followedId: req.body.followedId
    };
    Follow.addFollower(follow, (err, user) => {
        if (err) {
            //res.json({ success: false, msg: 'Failed to follow user' });
        } else {
            //res.json({ success: true, msg: 'User followed' });

            Follow.countFollowers(follow, (err, count) => {
                res.json({count: count});
            })

        }
    })

});

router.get('/numberOfFollowers', (req, res) => {

    let follow = {
        followedId: req.query.followedId
    };

    Follow.countFollowers(follow, (err, count) => {
        res.json({count});
    });
});

router.get('/listOfFollowings', (req, res) => {

    let follow = {
        followerId: req.query.followerId,
    };

    Follow.searchByFollowerId(follow, (err, list) => {
        res.json({list});
    });
});


/*
  -------------------USER STUFF---------------------
*/
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
router.post('/updateName', (req, res, next) => {
    User.updateName({id: req.body._id, name: req.body.name}, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update name'});
        } else {
            res.json({success: true, msg: 'Name updated'});
        }
    });
});

// Update User: Email
router.post('/updateEmail', (req, res, next) => {
    User.updateEmail({id: req.body._id, email: req.body.email}, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update e-mail'});
        } else {
            res.json({success: true, msg: 'E-mail updated'});
        }
    });
});

// Update User: Password
router.post('/updatePassword', (req, res, next) => {
    User.getUserById(req.body._id, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log('aici');
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(req.body.oldPassword, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {

                User.updatePassword({id: req.body._id, password: req.body.password}, (err, user) => {
                    if (err) {
                        res.json({success: false, msg: 'Failed to update password'});
                    } else {
                        res.json({success: true, msg: 'Password updated'});
                    }
                });

            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


router.get('/viewprofile', (req, res, next) => {
    User.getUserByUsername(req.username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

    });
});


router.get('/userprofile', (req, res) => {//searches for the user by his username

    User.getUserByUsername(req.query.username, (err, user) => {

        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        res.json({success: true, user: user});
    })
});

router.get('/userprofilebyemail', (req, res) => {

    User.getUserByEmail(req.query.email, (err, user) => {

        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        res.json({success: true, user: user});

    })
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
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
