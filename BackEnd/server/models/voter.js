const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');
const Video = require('../models/video')

//collection for each video vote
VotersSchema = mongoose.Schema({
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   
    class: String,  //the class of user for easier access
    rating: Number   //the value of the vote (between 1 and 5)
});

Voters = module.exports = mongoose.model('Voters', VotersSchema);


module.exports.searchByVideo = function(query, callback){
    Voters.find( {videoId:query._id}, callback );
}

module.exports.searchByUser = function(){//for further in time
    
}

module.exports.searchByBoth = function(query, callback){//video and user
    Voters.findOne( {videoId:query.videoId, voterId:query.voterId}, callback);
}


//let's add a vote without recalculation of the rating
module.exports.addVote = function(data, callback){
    let finalData = new Voters(data);
    finalData.videoId = data.videoId;
    finalData.save(callback);
}

//removes a voter without recalculation of the rating
module.exports.removeVote = function(query, callback){
    Voters.remove({videoId:query._id, voterId:query.voterId}, callback);
}

//updates a voter without recalculation of the rating
module.exports.updateVote = function(query, data, callback){
    Voters.update({videoId: query._id, voterId: query.voterId}, 
    { $set: { class:data.class, rating: data.rating }}, callback);
}