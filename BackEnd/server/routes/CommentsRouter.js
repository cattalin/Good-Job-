const passport = require( 'passport' );
const express  = require( 'express' );
const router   = express.Router({ mergeParams: true });

const Video   = require( '../models/video' );
const Comment = require( '../models/comment' );


//post a comment
router.post( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    var newComment = {
        userId:   req.user._id,
        username: req.user.username,
        class:    req.user.class,

        text:    req.body.text,
        videoId: req.params.videoId
    };

    console.log(JSON.stringify(req.params));
    console.log( newComment );

    Comment.addComment( new Comment( newComment ), (err, newComment) => {
        if(err) {
            res.json( {success: false, code: 404, status: 'resource_not_available'} );
        }
        else {

            let timestampedComment = newComment.toJSON();

            timestampedComment.timestamp = newComment._id.getTimestamp().getTime() / 1000;


            res.json( {success: true, code: 200, status: 'comment_added', newComment:timestampedComment} );
        }
    } )

} );


router.get( '/', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let query = {
        videoId: req.params.videoId
    };

    Comment.getComments( query, (err, comments) => {

        if(err) {
            return res.json( {success: false, code: 404, status: 'resource_not_available'} );
        }

        if(!comments || comments.length === 0) {
            return res.json( {success: false, code: 400, status: 'no_comments_found'} );
        }

        comments = comments.map(comment => {

            let timestampedComment = comment.toJSON();

            timestampedComment.timestamp = comment._id.getTimestamp().getTime() / 1000;
            return timestampedComment;

        });

        console.log(comments);

        res.json( {success: true, code: 200, status: 'comments_found', comments: comments} );
    } )

} );

router.get( '/count', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let query = {
        videoId: req.params.videoId
    };

    Comment.countComments( query, (err, commentsCount) => {

        if(err) {
            res.json( {success: false, code: 404, status: 'resource_not_available'} );
        }

        if(!commentsCount || commentsCount === 0) {
            return res.json( {success: false, code: 400, count: 0, status: 'no_comments_found'} );
        }

        res.json( {success: true, code: 200, status: 'comments_found', count: commentsCount} );
    } )

} );

router.delete( '/:commentId', passport.authenticate( 'jwt', {session: false} ), (req, res) => {

    let query = {
        videoId:   req.params.videoId,
        _id: req.params.commentId
    };

    Comment.removeComment( query, (err, removedEntriesCount) => {

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