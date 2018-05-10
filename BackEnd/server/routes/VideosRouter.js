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
router.post( '/:videoId/rate', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    console.log( 'Voting user_id: ' + req.user._id );

    let data = {
        videoId: req.params.videoId,
        voterId: req.user._id,
        rating:  req.body.rating,
        class:   req.user.class
    };

    console.log( JSON.stringify( data ) + " ---- " );

    RatingManager.rateVideo( data, (err, result) => {

        if(err) {
            return res.json( {success: false, code: 400, status: 'failed_to_rate'} );
        }
        else {
            return res.json( {success: true, code: 200, status: 'rating_saved', result:result} );
        }

    } )

} );

router.get( '/hasRated', passport.authenticate( 'jwt', {session: false} ), (req, res) => {
    let query = {
        videoId: req.query.videoId,
        voterId:  req.user._id,
    };

    // query = Object.assign({}, req.query);


    console.log( JSON.stringify( query ) + " ---- " );

    RatingManager.hasRated( query, (rating) => {
        res.json( {success: true, code: 200, userRating: rating} );

    } )
} );


router.delete( '/:videoId', passport.authenticate( 'jwt', {session: false} ), (req, res) => {
    let videoId = req.params.videoId;

    console.log( videoId );

    Video.removeVideo( videoId, (err, removedVideosCount) => {

        if(err) {
            res.json( {success: false, code: 400, status: 'invalid_id'} );
        }
        else {

            if(removedVideosCount.n === 0) {
                res.json( {success: false, code: 404, status: 'video_not_found'} );
            }
            else {
                res.json( {success: true, code: 200, status: 'remove_ok'} );
            }

        }

    } )
} );

//post a video
router.post( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let newVideo = {
        description: req.body.description,
        rating:      req.body.rating,
        link:        req.body.link,
        title:       req.body.title,

        username: req.user.username,
        class:    req.user.class,
        userId:   req.user,
    };


    console.log( 'Inserting new video' + JSON.stringify( newVideo ) );

    Video.addVideo( new Video( newVideo ), (err, insertedVideo) => {

        if(err) {

            return res.json( {success: false, code: 400, msg: 'upload_failed'} );

        }
        else {

            //save the changes to user also
            // req.user.uploadedVideos.push(insertedVideo._id);
            // req.user.save();

            let data = {
                voterId: newVideo.userId,
                rating:  newVideo.rating,
                class:   newVideo.class,
                videoId: insertedVideo._id
            };

            RatingManager.rateVideo( data, (err2, voted) => {

                if(err2) {

                    return res.json( {success: true, code: 201, msg: 'success_without_rating'} );

                }
                else {

                    return res.json( {success: true, code: 200, msg: 'success'} );

                }

            } )
        }
    } )
} );

module.exports = router;