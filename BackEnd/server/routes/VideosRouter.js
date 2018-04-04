const passport = require( 'passport' );
const express  = require( 'express' );
const router   = express.Router();

const Video  = require( '../models/video' );
const Follow = require( '../models/follow' );
const RatingManager = require('../managers/ratingManager');


function getQueryFromReq(req) {//todo move this to search manager

    let query = {
        followerId: req.query.followerId,
        select:     req.query.select,
        limit:      req.query.limit,
        skip:       req.query.skip,
        sort:       req.query.sort
    };

    console.log( 'Current user: ' + JSON.stringify( req.user ) );
    console.log( 'Search query: ' + JSON.stringify( req.query ) );

    //remove empty entries
    query = {};
    Object.keys( req.query ).forEach( key => {
        if(req.query[key]) {
            query[key] = req.query[key]
        }
    } );

    query.userId = req.user._id;

    if(!query.limit) {
        query.limit = 50;
    }

    console.log( 'Parsed search query: ' + JSON.stringify( query ) );

    return query;
}


function retrieveVideos(query, res) {
    Video.getVideos( query, (err, videos) => {

        if(err) return res.json( {success: false, code: 404, status: 'resource_unavailable'} );
        if(!videos) return res.json( {success: false, code: 404, status: 'no_videos_found'} );

        videos = videos.map(//mark the ones belonging to the current user
            (userVideo) => {

                let parsedVideo = JSON.parse( JSON.stringify( userVideo ) );//dupe a mongoose object

                if(parsedVideo.userId.toString() === query.userId.toString()) {
                    parsedVideo.ownVideo = true;
                }

                return parsedVideo;
            } );

        res.json( {success: true, code: 200, count: videos.length, videos: videos} );

    } )
}


//the the basic feed of videos
router.get( '/search', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let query = getQueryFromReq( req );

    return retrieveVideos( query, res );

} );

router.get( '/feedByFollow', passport.authenticate( 'jwt', {session: false} ), (req, res) => {//todo these 2 and the one from search
    // manager need to be merged

    getQueryFromReq( req );


    Follow.getFollowedIds( query, (err, ids) => {

        query.uploadersIds = [];
        ids.forEach( id => {
            query.uploadersIds.push( id.followedId );
        } );

        return retrieveVideos( query, res );
    } )
} );


router.get( '/feedCount', (req, res) => {//todo remove this, deprecated

    let query = {
        sort:   req.query.sort,
        select: req.query.select,
        limit:  req.query.limit,
        skip:   req.query.skip,
    };

    Video.countVideos( query, (err, nrVideos) => {

        if(err) throw err;

        if(!nrVideos) {
            return res.json( {success: false, msg: 'Videos not found'} );
        }

        res.json( {success: true, nrVideos: nrVideos} );
    } )
} );

router.get( '/feedCountByFollow', (req, res) => {//todo remove this
    const query = {
        sort:       req.query.sort,
        select:     req.query.select,
        limit:      req.query.limit,
        skip:       req.query.skip,
        followerId: req.query.followerId,
    }
    Follow.getFollowedIds( query, (err, ids) => {
        let followedIds = [];
        ids.forEach( id => {
            followedIds.push( id.followedId );
        } )
        Video.countVideosByFollowing( query, followedIds, (err, nrVideos) => {
            if(err) throw err;
            if(!nrVideos) {
                return res.json( {success: false, msg: 'Videos not found'} );
            }

            res.json( {success: true, nrVideos: nrVideos} );
        } )
    } )
} );

//rate a video
router.post( '/rate', (req, res) => {

    let conditions = {
        _id: req.body._id
    };

    let data = {
        voterId: req.body.userId,//todo get from auth token
        rating:  req.body.rating
    };

    User.getClassById( data.voterId, (err, cls) => {
        if(err) return res.json( {success: false, msg: 'Failed'} );

        data.class = cls.class;

        RatingManager.rateVideo( conditions, data, (err, result) => {

            if(err) {
                return res.json( {success: false, msg: 'Failed to upload video', result: result} );
            }
            else {
                return res.json( {success: true, msg: 'Video saved', result: result} );
            }

        } )

    } );

} );

//post a video
router.post( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let newVideo = {
        link:        req.body.link,
        title:       req.body.title,
        description: req.body.description,
        username:    req.body.username,
        rating:      req.body.rating,
        class:       req.body.class
    };

    newVideo.userId = req.user._id;

    console.log(JSON.stringify(newVideo));

    Video.addVideo( new Video( newVideo ), (err, video) => {
        if(err) {
            return res.json( {success: false, msg: 'Failed to upload video'} );
        }
        else {
            let conditions = {
                _id: video._id
            }
            let data       = {
                voterId: newVideo.userId,
                rating:  newVideo.rating,
                class:   newVideo.class
            }
            RatingManager.rateVideo( conditions, data, (err2, result) => {
                if(err2) {
                    console.log( 'Failed to rate video' );
                }
                else {
                    console.log( 'Video rated' );
                }

                res.json( {success: true, msg: 'Video saved'} );
            } )
        }
    } )
} );

router.delete( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {
    let videoId = req.body._id;

    Video.removeVideo( videoId, (err, removedVideosCount) => {
        if(err) {
            res.json( {success: false, code: 400, status:'invalid_id'} );
        }
        else {
            if( removedVideosCount.n === 0 )
            {
                res.json( {success: false, code: 404, status:'video_not_found'} );
            }
            else {
                res.json( {success: false, code: 200, status:'remove_ok'} );
            }
        }
    } )
} );

module.exports = router;