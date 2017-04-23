const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');


//subdocument for each video vote
VotersSchema = mongoose.Schema({
    voterId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},   
    class: String,  //the class of user for easier access
    rating: Number   //the value of the vote (between 1 and 5)
})
VideoSchema = mongoose.Schema({
    link: String,
    title: String,
    description: String,
    rating: Number,
    username: String,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    rating: Number,
    votes: Number,
    voters: [VotersSchema]

});

Voters = mongoose.model('Voters', VotersSchema);
Video = module.exports = mongoose.model('Video', VideoSchema);






//Conditions: identify the video    Update:vote the video   Options:unique update
module.exports.rateVideo = function(conditions, data, callback){
    let query= {
        _id: conditions._id, 
        voterId: data.voterId
    }
    this.findWithVoter( query, (err, result)=>{
        if(!err)
            if(result!=null){
                let voter = null;
                console.log(result.voters);//a document with the same vote has been found
                result.voters.map(x => {
                    if (this.isSameVote(data, x))
                        voter = x;
                })
                console.log("the voter is "+voter);
                if(voter)//if it's the same it means we need to remove it
                {
                    console.log("removing...");
                    this.removeVote(query, (err, res) => {
                        if(!err){
                            this.recalculateRating
                        }
                    });
                }
                else {//different vote found by the same user -> we update it
                    console.log("updating...");
                    this.updateVote(query, data, callback);
                }
            }
            else {  //a vote doesn t exist so we need to insert it
                console.log("adding..."+data);
                this.addVote(conditions, data, callback);
            
            }
        else console.log("oops");
    })
}




//finds a video that by _id and voterId criteria
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

//compares 2 votes by rating
module.exports.isSameVote = function(vote1, vote2){

    if (vote1.rating == vote2.rating&&vote1.voterId == vote2.voterId)
        return true;
    //console.log(vote1.voterId +" "+ vote2.voterId+" "+vote1.rating +" "+vote2.rating)
    return false;
}

//let's add a vote without recalculation of the rating
module.exports.addVote = function(query, data, callback){
    let finalData = new Voters(data);
    /*finalData.voterId = data.voterId;
    finalData.class = data.class;
    finalData.rating = data.rating;*/
    Video.update({_id: query._id}, {$push: {voters: finalData}}, { upsert: false }, callback);
}

//removes a voter without recalculation of the rating
module.exports.removeVote = function(query, callback){
    Video.findByIdAndUpdate(query._id, {$pull: {voters: {voterId: query.voterId}}
    }, callback);
}

module.exports.updateVote = function(query, data, callback){
    Video.update({_id: query._id, "voters.voterId": query.voterId}, 
    {"$set": {"voters.$": new Voters(data)}}, { upsert: false }, callback);
}


//method for updating the rating
module.exports.updateVideo = function(query, data, callback){
    Video.update({_id: query._id, "voters.voterId": query.voterId}, 
    { rating: data.rating, votes: data.votes }, {upsert:false }. callback);
}


//TODO: MUST BE CHANGED: RECALCULATES RATING FROM SCRATCH 
module.exports.recalculateRating = function(voters){
    let update = {
        rating: 1,
        votes: 0
    }
    let sum=0;

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
    update.rating = sum/update.votes;
    console.log(update.rating);
    return update;
    
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

        //we consider the uploader rating it's first vote
        newVideo.voters[0]=
        {
            voterId: newVideo.userId,
            class: user.class,
            rating: newVideo.rating
        }
        console.log(newVideo);
        newVideo.save(callback);
    });
}



module.exports.getVideoById = function(id, callback){
    Video.findById(id, callback);
}

module.exports.getVideos = function(q, callback){
    Video.find(callback).sort([[q.sort, -1]]);
}