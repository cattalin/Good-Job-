const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');
const Follow=require('../models/follow');


VideoSchema = mongoose.Schema({
    link: String,
    title: String,
    description: String,
    rating: Number,
    username: String,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    votes: Number,

});
Video = module.exports = mongoose.model('Video', VideoSchema);





//method for updating the rating
module.exports.updateVideo = function(query, data, callback){
    Video.update({_id: query._id}, 
    { rating: data.rating, votes: data.votes }, {upsert:false }, callback);
}

module.exports.getVideoById = function(id, callback){
    Video.findById(id, callback);
}

module.exports.getVideos = function(q, callback){
    if(q.select)
        Video.find({username: q.select},callback).sort([[q.sort, -1]]);
    else
        Video.find(callback).sort([[q.sort, -1]]);
}

module.exports.addVideo = function(newVideo, callback){
    //we first get some of the uploader's data
    User.getClassById(newVideo.userId, (err, user) =>{

        //basic law relation between user class and his voting power
        switch (user.class) {
            case 'A':
                newVideo.votes = 1;
                break;
            case 'B':
                newVideo.votes = 3;
                break;
            case 'C':
                newVideo.votes = 5;
                break;
            case 'D':
                newVideo.votes = 7;
                break;
            case 'E':
                newVideo.votes = 10;
                break;
        }
        console.log(newVideo);
        newVideo.save(callback);
    });
}








//finds a video that by _id and voterId criteria 
//TODELETE
module.exports.findWithVoter = function(query, callback){
    let options = { 
        multi: false,
        upsert: true
    }
    console.log(query.voterId);
    Video.findOne({ _id: query._id, "voters.voterId": query.voterId})
    .populate({path: 'voters', model: Voters,
              match: { voterId: {$eq: query.voterId}}})
    .exec(callback);
}



module.exports.following = function(query,callback){

    let follow = {
    followerId: query.followerId,
    };

    Follow.searchByFollowerId(follow, (err, list) =>{

    for (let entry of list) {
     Video.findOne({"follow.followerId": list.followerId})
        .populate({path: 'follow', model: Follow})
        .exec(callback);
    }

    });
}

/*
//Conditions: identify the video    Update:vote the video   Options:unique update
module.exports.rateVideo = function(conditions, data, callback){
    let options = { multi:false, upsert:true};
    
    
    // QUERRY FOR FINDING COMPOUND DOCUMENTS
    Video.findOne({_id: conditions._id})
    .populate({path: 'voters', model: Voters,
              match: { voterId: {$eq: data.voterId}}})
    .exec((err, video) => {
        if(err)//user didn t already vote so we have to insert it's vote
                //this means that video is null cauz we didn t find anything
        {
            Video.findOne({_id: conditions._id}, 'rating votes', (err, video) => {//we search for the video agian
                console.log(video);
                let vote={
                voterId: data.voterId,
                class: data.class,
                rating: data.rating
                };
                let update = {
                votes:0,
                rating:0
                 };

                //proccess the change in rating of the video
                switch (data.class) {
                case 'A':
                    update.votes = video.votes+1;
                    update.rating = (video.rating*video.votes+data.rating)/update.votes;//i think is better video.rating+=(rating*1 3 ... 10)/update.votes;
                    break;
                case 'B':
                    update.votes = video.votes+3;
                    update.rating = (video.rating*video.votes+data.rating*3)/update.votes;
                    break;
                case 'C':
                    update.votes = video.votes+5;
                    update.rating = (video.rating*video.votes+data.rating*5)/update.votes;
                    break;
                case 'D':
                    update.votes = video.votes+7;
                    update.rating = (video.rating*video.votes+data.rating*7)/update.votes;
                    break;
                case 'E':
                    update.votes = video.votes+10;
                    update.rating = (video.rating*video.votes+data.rating*10)/update.votes;
                    break;
                }
                Video.update(conditions, {update, $push: {"voters":vote}}, options, callback);
            });
            
        }
        else{console.log(data.voterId);/*
        console.log(video);
        let update = {
            votes:0,
            rating:0
        };
        let oldVote = video.voters[0];
        console.log(oldVote);
        oldvote.class=data.class;
        oldVote.rating=data.rating;
        
        voters.map(x => {
            if (x.voterId==data.voterId) {
                x.class = data.class;
                x.rating = data.rating;
            }
            return x.voterId;
        });
        
    }})
}

*/