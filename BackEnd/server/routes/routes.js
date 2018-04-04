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

module.exports = router;