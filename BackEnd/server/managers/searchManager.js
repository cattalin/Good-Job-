const Video         = require( '../models/video' );
const RatingManager = require( '../managers/ratingManager' );


function getQueryFromReq(req) {//todo move this to search manager

    let query = {
        searchedContent: req.body.filter.searchedContent,
        criteria:        req.body.filter.criteria,
        limit:           req.body.pagination.limit,
        skip:            req.body.pagination.skip,
        sort:            req.body.pagination.sort
    };

    console.log( 'Current user: ' + JSON.stringify( req.user ) );
    console.log( 'Search query: ' + JSON.stringify( req.body ) );

    // //remove empty entries
    // query = {};
    // Object.keys( req.query ).forEach( key => {
    //     if(req.query[key]) {
    //         query[key] = req.query[key]
    //     }
    // } );

    query.userId = req.user._id;

    if(!query.limit) {
        query.limit = 50;
    }

    console.log( 'Parsed search query: ' + JSON.stringify( query ) );

    return query;
}


function retrieveVideos(query, res) {
    Video.getVideos( query, (err, videos) => {

        if(err) {
            console.log( 'Error found searching videos: ' + JSON.stringify( err ) );
            return res.json( {success: false, code: 404, status: 'resource_unavailable'} );
        }
        if(!videos) return res.json( {success: false, code: 404, status: 'no_videos_found'} );


        videos.results = videos.results.map(//mark the ones belonging to the current user
            (userVideo) => {

                let parsedVideo = JSON.parse( JSON.stringify( userVideo ) );//dupe a mongoose object

                if(parsedVideo.userId) {//todo delete this after database drop

                    console.log( JSON.stringify( userVideo.userId ) );

                    // parsedVideo.username = parsedVideo.userId.username;//TODO these is here just to keep the old data structure
                    parsedVideo.userId = parsedVideo.userId._id;

                    if(parsedVideo.userId.toString() === query.userId.toString()) {
                        parsedVideo.ownVideo = true;
                    }
                    else {
                        parsedVideo.ownVideo = false;
                    }

                    // let xxx = await RatingManager.hasRated( {userId: parsedVideo.userId, videoId: parsedVideo._id} ).then((resDoc) =>{
                    //         console.log('FULFILLED ' + resDoc.rating);
                    //     }
                    // )
                }

                return parsedVideo;
            } );

        res.json( {success: true, code: 200, count: videos.count, videos: videos} );

    } )
}


let searchManager = {};

searchManager.retrieveVideos  = retrieveVideos;
searchManager.getQueryFromReq = getQueryFromReq;

module.exports = searchManager;