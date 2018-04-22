const passport = require( 'passport' );
const express  = require( 'express' );
const router   = express.Router();

const Video   = require( '../models/video' );
const Comment = require( '../models/comment' );


router.delete( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {
    let videoId = req.query._id;

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

//post a comment
router.post( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    var newComment = {
        userId:   req.user._id,
        username: req.user.username,
        class:    req.user.class,

        text:    req.body.text,
        videoId: req.body.videoId
    };

    console.log( newComment );

    Comment.addComment( new Comment( newComment ), (err, success) => {
        if(err) {
            res.json( {success: false, code: 404, status: 'resource_not_available'} );
        }
        else {
            res.json( {success: true, code: 200, status: 'comment_added'} );
        }
    } )
} );


router.get( '/comments', (req, res) => {
    let query = {
        videoId: req.query.videoId
    }
    Comment.getComments( query, (err, comments) => {
        if(err) throw err;
        if(!comments) {
            return res.json( {success: false, msg: 'comments not found'} );
        }
        comments.forEach( function(element) {
            console.log( element );
        }, this );

        res.json( {success: true, comments: comments} );
    } )

} )

router.post( '/deletecomm', (req, res, next) => {
    let todel = req.body._id;
    Comment.removeComment( todel, (err, user) => {
        if(err) {
            res.json( {success: false, msg: 'Failed to remove'} );
        }
        else {
            res.json( {success: true, msg: 'removed'} );
        }
    } )
} );


module.exports = router;