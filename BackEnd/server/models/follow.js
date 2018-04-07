const mongoose = require( 'mongoose' );

// User Schema
const FollowSchema = mongoose.Schema( {
    followerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    followedId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
} );

let Follows = module.exports = mongoose.model( 'Follow', FollowSchema );

//get the persons that you are following       (you are their follower)
Follows.searchByFollowerId = function(query, callback) {

    Follows.find( {followerId: query.followerId}, callback );

};

//get the persons that you are following       (you are their follower)
Follows.getFollowedIds = function(followerId, callback) {

    Follows.find( {followerId: followerId} )
        .select( 'followedId' )
        .exec( callback );

};

//get the persons that follow you              (you are their followed)
Follows.searchByFollowedId = function(query, callback) {

    Follows.find( {followedId: query.followedId}, callback );

};

//get the NUMBER of persons that follow you    (you are their followed)
Follows.countFollowers = function(query, callback) {

    Follows.count( {followedId: query.followedId}, callback );

};


//let's add a vote without recalculation of the rating
Follows.addFollower = function(data, callback) {

    //TODO: check if already is (this is working) => implement unfollow
    Follows.findOne( {followerId: data.followerId, followedId: data.followedId}, function(err, obj) {

        if(err) console.log( 'error' );

        if(obj === null) {
            let finalData = new Follows( data );
            finalData.save( callback );
        }
        else {
            return false;
        }

    } );

}