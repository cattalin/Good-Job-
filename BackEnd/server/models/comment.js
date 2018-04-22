const mongoose = require( 'mongoose' );


CommentSchema = mongoose.Schema( {
    text:     String,
    username: String,
    videoId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
    userId:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

} );

let Comment = module.exports = mongoose.model( 'Comment', CommentSchema );

Comment.searchByVideo = function(query, callback) {

    Comment.find( {videoId: query._id}, callback );

};

Comment.searchByBoth = function(query, callback) {//video and user

    Comment.findOne( {videoId: query._id, voterId: query.voterId}, callback );

};


Comment.getComments = function(query, callback) {

    Comment.find( {videoId: query.videoId}, callback );

};


Comment.removeComment = function(query, callback) {

    Comment.remove( query, callback );

};

Comment.addComment = function(data, callback) {

    let finalData = new Comment( data );
    finalData.save( callback );

};


