const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');
const Video = require('../models/video');
const Voter = require('../models/voter');



//Conditions: identify the video    Update:vote the video   Options:unique update
module.exports.rateVideo = function(conditions, data, callback){
    let query= {
        _id: conditions._id, 
        voterId: data.voterId
    }

    Voter.searchByBoth(query, (err, voter) => {//we search for the vote of the user on that video
        if(!err)
            if(voter){
                if(isSameVote(voter, data))//if it's the same it means we need to remove it
                {
                    Voter.removeVote(query, (err, res) => {
                        if(!err){
                            this.recalculateRating(query, (err, newRating) => {
                                Video.updateVideo(query, newRating, (err, x) => {
                                    callback(null, {rating:newRating.rating, votes:newRating.votes, 
                                        currentVote:0})})//custom callback with our needed parameters that we sent to the frontend
                            });
                        }
                    });
                }
                else{//different vote found by the same user -> we update it
                    Voter.updateVote(query, data, (err, res) => {
                        if(!err){
                            this.recalculateRating(query, (err, newRating) => {
                                Video.updateVideo(query, newRating, (err, x) => {
                                    callback(null, {rating:newRating.rating, votes:newRating.votes, 
                                        currentVote:data.rating})})//custom callback with our needed parameters that we sent to the frontend
                            });
                        }
                    });
                }
            }
            else{//a vote doesn t exist so we need to insert it
                Voter.addVote(conditions, data, (err, res) => {
                    if(!err){
                        this.recalculateRating(query, (err, newRating) => {
                            Video.updateVideo(query, newRating, (err, x) => {
                                callback(null, {rating:newRating.rating, votes:newRating.votes, 
                                    currentVote:data.rating})})//custom callback with our needed parameters that we sent to the frontend
                        });
                    }
                });
            }
        else
        ;
    });
}

module.exports.hasRated = function(query, callback){
    let q = {
        _id: query.videoId,
        voterId: query.userId
    }
    Voter.searchByBoth(q, (err, result) =>{
        if(err)
            callback(err, 0);
        else if(result == null)
            callback(null, 0);
        else callback(null, result.rating);
    });

}

//TODO: MUST BE CHANGED: RECALCULATES RATING FROM SCRATCH 
module.exports.recalculateRating = function(query, callback){
    Voter.searchByVideo(query, (err, result) => {
        if(!err){
            let voters=result;
            let update = {
                rating: 1,
                votes: 0
            }
            let sum = 0;
            let err = null;
            voters.map(x => {
                switch (x.class) {
                case 'A':
                    update.votes++;
                    sum += x.rating;
                    break;
                case 'B':
                    update.votes += 3;
                    sum += x.rating*3;
                    break;
                case 'C':
                    update.votes += 5;
                    sum += x.rating*5;
                    break;
                case 'D':
                    update.votes += 7;
                    sum += x.rating*7;
                    break;
                case 'E':
                    update.votes += 10;
                    sum += x.rating*10;
                    break;
                }
            })
            update.rating = (sum/update.votes).toFixed(2);
            callback(err, update);
        }
    })
}


//compares 2 votes by rating
function isSameVote(vote1, vote2){

    if (vote1.rating == vote2.rating&&vote1.voterId == vote2.voterId)
        return true;
    return false;
} 