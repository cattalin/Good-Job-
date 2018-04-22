const passport = require( 'passport' );
const express  = require( 'express' );
const router   = express.Router();

const Video   = require( '../models/video' );
const Comment = require( '../models/comment' );


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


router.get( '/:videoId', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let query = {
        videoId: req.params.videoId
    };

    Comment.getComments( query, (err, comments) => {

        if(err) {
            res.json( {success: false, code: 404, status: 'resource_not_available'} );
        }

        if(!comments || comments.length === 0) {
            return res.json( {success: false, code: 400, status: 'no_comments_found'} );
        }

        res.json( {success: true, code: 200, status: 'comments_found', comments: comments} );
    } )

} );

router.delete( '/:commentId', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let commentId = req.params.commentId;

    Comment.removeComment( commentId, (err, removedEntriesCount) => {

        if(err) {
            res.json( {success: false, code: 400, status: 'invalid_id'} );
        }
        else {

            if(removedEntriesCount.n === 0) {
                res.json( {success: false, code: 404, status: 'comment_not_found'} );
            }
            else {
                res.json( {success: false, code: 200, status: 'remove_ok'} );
            }

        }

    } )

} );


module.exports = router;