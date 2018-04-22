const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Video = require('../models/video');
const Comment = require('../models/comment');
const Follow = require('../models/follow');

const ClassManager = require('../managers/classManager');
const RatingManager = require('../managers/ratingManager');
const SearchManager = require('../managers/searchManager');

/*
  -------------------COMMENT STUFF---------------------
*/


/*
  -------------------VIDEO STUFF---------------------
*/





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

module.exports = router;