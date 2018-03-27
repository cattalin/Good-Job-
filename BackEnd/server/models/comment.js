const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');


CommentSchema = mongoose.Schema({
    text: String,
    username: String,
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});
Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.searchByVideo = function(query, callback){
    Comment.find( {videoId:query._id}, callback );
}

module.exports.searchByBoth = function(query, callback){//video and user
    Comment.findOne( {videoId:query._id, voterId:query.voterId}, callback);
}


module.exports.getComments = function(query, callback){
    Comment.find( {videoId: query.videoId}, callback);
}


module.exports.removeComment = function(query,callback) {
    console.log(query)
    Comment.remove({_id:query}, callback);
}

module.exports.addComment = function(data, callback){
    let finalData = new Comment(data);
    finalData.save(callback);
}


