
const Video    = require( '../models/video' );
const Voter    = require( '../models/voter' );


//Conditions: identify the video    Update:vote the video   Options:unique update
module.exports.rateVideo = function(data, callback) {

    let query = {
        videoId: data.videoId,
        voterId: data.voterId
    };

    Voter.searchByBoth( query, (err, currentVote) => {//we search for the vote of the user on that video
        if(!err && currentVote) {
            if(isSameVote( currentVote, data ))//if it's the same it means we need to remove it
            {
                Voter.removeVote( query, (err, res) => {
                    console.log( 'Removing vote' );
                    if(!err) {
                        this.recalculateRating( query, (newRating) => {
                            Video.rateVideo( query, newRating, (err, x) => {
                                callback( err, {
                                    rating:      newRating.rating, votes: newRating.votes,
                                    currentVote: 0
                                } )
                            } )
                        } );
                    }
                } );
            }
            else {//different vote found by the same user -> we update it
                Voter.updateVote( query, data, (err, res) => {
                    console.log( 'Updating vote' );
                    if(!err) {
                        this.recalculateRating( query, (newRating) => {
                            Video.rateVideo( query, newRating, (err, x) => {
                                callback( err, {
                                    rating:      newRating.rating, votes: newRating.votes,
                                    currentVote: data.rating
                                } )
                            } )
                        } );
                    }
                } );
            }
        }
        else {//a vote doesn t exist so we need to insert it
            Voter.addVote( data, (err, res) => {
                console.log( 'Adding vote' );
                if(!err) {
                    this.recalculateRating( query, (newRating) => {
                        Video.rateVideo( query, newRating, (err, x) => {
                            callback( err, {
                                rating:      newRating.rating, votes: newRating.votes,
                                currentVote: data.rating
                            } )
                        } )
                    } );
                }
            } );
        }
    } );
}

module.exports.hasRated = function(query, callback) {
    Voter.searchByBoth( query, (err, result) => {
        if(err || result == null) {
            callback( 0 );
        }
        else {
            callback( result.rating );
        }
    } );
};

// module.exports.hasRated = async function(query){
//     let q = {
//         videoId: query.videoId,
//         voterId: query.userId
//     };
//
//     return Voter.searchByBoth(q);
// };

//TODO: MUST BE CHANGED: RECALCULATES RATING FROM SCRATCH 
module.exports.recalculateRating = function(query, callback) {
    Voter.searchByVideo( query, (err, result) => {
        if(!err && result) {

            let voters = result;
            let update = {
                rating: 1,
                votes:  0
            };
            let sum    = 0;
            voters.map( x => {
                let increasingFactor = 1;
                switch(x.class) {
                    case 'A':
                        increasingFactor = 1;
                        break;
                    case 'B':
                        increasingFactor = 3;
                        break;
                    case 'C':
                        increasingFactor = 5;
                        break;
                    case 'D':
                        increasingFactor = 7;
                        break;
                    case 'E':
                        increasingFactor = 10;
                        break;
                }

                update.votes += increasingFactor;
                sum += x.rating * increasingFactor;
            } );
            update.rating = (sum / update.votes).toFixed( 2 );

            callback( update );
        }
        else {
            callback( {rating: 0} );
        }
    } )
};


//compares 2 votes by rating
function isSameVote(vote1, vote2) {
    return (vote1.rating.toString() === vote2.rating.toString() && vote1.voterId.toString() === vote2.voterId.toString())
} 