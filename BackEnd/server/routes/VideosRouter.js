const passport = require('passport');
const express = require('express');
const router = express.Router();


const Video = require('../models/video');


//the the basic feed of videos
router.get('/feed', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log('Current user: ' + JSON.stringify(req.user));
    console.log('Search query: ' + JSON.stringify(req.query));

    let query = {};
    Object.keys(req.query).forEach(key => {
        if (req.query[key])// && req.query[key] !== '')
            query[key] = req.query[key]
    });

    if (!query.limit) {
        query.limit = 50;
    }

    console.log('Parsed search query: ' + JSON.stringify(query));

    Video.getVideos(query, (err, videos) => {

        if (err) return res.json({success: false, code: 404, status: 'resource_unavailable'});
        if (!videos) return res.json({success: false, code: 404, status: 'no_videos_found'});

        videos = videos.map(
            (userVideo) => {

                let res = JSON.parse(JSON.stringify(userVideo));//dupe a mongoose object

                if (res.userId.toString() === req.user._id.toString()){
                    res.ownVideo = true;
                }

                return res;
            });

        res.json({success: true, code: 200, count: videos.length, videos: videos});

    })
});

router.get('/feedCount', (req, res) => {//todo remove this, deprecated

    const query = {
        sort: req.query.sort,
        select: req.query.select,
        limit: req.query.limit,
        skip: req.query.skip,
    };

    Video.countVideos(query, (err, nrVideos) => {

        if (err) throw err;

        if (!nrVideos) {
            return res.json({success: false, msg: 'Videos not found'});
        }

        res.json({success: true, nrVideos: nrVideos});
    })
});

router.get('/feedByFollow', (req, res) => {
    const query = {
        sort: req.query.sort,
        select: req.query.select,
        limit: req.query.limit,
        skip: req.query.skip,
        followerId: req.query.followerId,
    }
    //db.collection.find( { field : { $in : array } } );
    Follow.getFollowedIds(query, (err, ids) => {
        let followedIds = [];
        ids.forEach(id => {
            followedIds.push(id.followedId);
        })
        Video.getByFollowedIds(query, followedIds, (err, videos) => {
            if (err) throw err;
            if (!videos) {
                return res.json({success: false, msg: 'Videos not found'});
            }

            res.json({success: true, videos: videos});
        })
    })
});

router.get('/feedCountByFollow', (req, res) => {
    const query = {
        sort: req.query.sort,
        select: req.query.select,
        limit: req.query.limit,
        skip: req.query.skip,
        followerId: req.query.followerId,
    }
    Follow.getFollowedIds(query, (err, ids) => {
        let followedIds = [];
        ids.forEach(id => {
            followedIds.push(id.followedId);
        })
        Video.countVideosByFollowing(query, followedIds, (err, nrVideos) => {
            if (err) throw err;
            if (!nrVideos) {
                return res.json({success: false, msg: 'Videos not found'});
            }

            res.json({success: true, nrVideos: nrVideos});
        })
    })
});

//rate a video
router.post('/rate', (req, res, next) => {
    let conditions = {
        _id: req.body._id
    }
    let data = {
        voterId: req.body.userId,
        rating: req.body.rating
    }
    User.getClassById(data.voterId, (err, cls) => {
        data.class = cls.class;
        if (err)
            res.json({success: false, msg: 'Failed'});

        else {
            RatingManager.rateVideo(conditions, data, (err2, result) => {
                if (err2) {
                    res.json({success: false, msg: 'Failed to upload video', result: result});
                } else {
                    console.log("rating indeed saved")
                    res.json({success: true, msg: 'Video saved', result: result});
                }
            })
        }
    });
});

//post a video
router.post('/upload', (req, res) => {

    let newVideo = {
        link: req.body.link,
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        username: req.body.username,
        rating: req.body.rating,
        class: req.body.class
    };

    Video.addVideo(new Video(newVideo), (err, video) => {
        if (err) {
            res.json({success: false, msg: 'Failed to upload video'});
        }
        else {
            let conditions = {
                _id: video._id
            }
            let data = {
                voterId: newVideo.userId,
                rating: newVideo.rating,
                class: newVideo.class
            }
            RatingManager.rateVideo(conditions, data, (err2, result) => {
                if (err2) {
                    console.log('Failed to rate video');
                } else {
                    console.log('Video rated');
                }
            })
            res.json({success: true, msg: 'Video saved'});
        }
    })
});

router.post('/delete', (req, res, next) => {
    let todel = req.body._id;

    Video.removeVideo(todel, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to remove'});
        } else {
            res.json({success: true, msg: 'removed'});
        }
    })
});

module.exports = router;