
const passport = require( 'passport' );
const express  = require( 'express' );
const router   = express.Router();

const Video         = require( '../models/video' );
const Follow        = require( '../models/follow' );
const RatingManager = require( '../managers/ratingManager' );
const SearchManager = require( '../managers/searchManager' );


//the the basic feed of videos
router.post( '/search', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let query = SearchManager.getQueryFromReq( req );

    if(query.criteria === 'following') {

        Follow.getFollowedIds( req.user._id, (err, ids) => {

            query.uploadersIds = [];
            ids.forEach( id => {
                query.uploadersIds.push( id.followedId );
            } );

            return SearchManager.retrieveVideos( query, res );
        } )

    }
    else {

        return SearchManager.retrieveVideos( query, res );

    }

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

    console.log( JSON.stringify( newVideo ) );

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
            res.json( {success: false, code: 400, status: 'invalid_id'} );
        }
        else {
            if(removedVideosCount.n === 0) {
                res.json( {success: false, code: 404, status: 'video_not_found'} );
            }
            else {
                res.json( {success: false, code: 200, status: 'remove_ok'} );
            }
        }
    } )
} );

module.exports = router;