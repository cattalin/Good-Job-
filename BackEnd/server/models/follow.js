const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const FollowSchema = mongoose.Schema({
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

Follows = module.exports = mongoose.model('Follow', FollowSchema);

module.exports.searchByFollowerId = function(query, callback){//get the persons that you are following      (you are their follower)
    Follows.find( {followerId:query.followerId}, callback );
}

module.exports.searchByFollowedId = function(query, callback){//get the persons that follow you             (you are their followed)
    Follows.find( {followedId:query.followedId}, callback );
}

module.exports.countFollowers = function(query, callback){//get the NUMBER of persons that follow you       (you are their followed)
    Follows.count    ( {followedId:query.followedId}, callback );
}

//let's add a vote without recalculation of the rating
module.exports.addFollower = function(data, callback){
    let finalData = new Follows(data)   
    finalData.save(callback);
}