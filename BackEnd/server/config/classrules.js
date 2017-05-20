module.exports = {
    A: {
        nrOfVideos: 0,
        nrOfFollowers: 0,
        nrOfGoodVids: 0,
        nrOfDecentVids: 0,
        rateOfDecentVideos:0,
        nrOfVotes:1,
        nameOfnextRank:'B',
        nameOfpreviosRank:'bottom',
        nameInDatabase:'A'
    },
    
    B: {
        nrOfVideos: 1,//change to 3
        nrOfFollowers: 1,//change to 5
        nrOfGoodVids: 1,
        nrOfDecentVids: 1,//adica 2=nrOfGoodVids+1
        rateOfDecentVideos:0,//change to 0.2,
        nrOfVotes:3,
        nameOfnextRank:'C',
        nameOfpreviosRank:'A',
        nameInDatabase:'B'
    },
    C: {
        nrOfVideos: 3,//change to 10
        nrOfFollowers: 2,//change to 25
        nrOfGoodVids: 1,//change to 3
        nrOfDecentVids: 2,//change to 7 
        rateOfDecentVideos:0,//change to 0.4,
        nrOfVotes:5,
        nameOfnextRank:'D',
        nameOfpreviosRank:'B',
        nameInDatabase:'C'
    },
    D: {
        nrOfVideos: 5,//change to 32
        nrOfFollowers: 3,//change to 100
        nrOfGoodVids: 2,//change to 15
        nrOfDecentVids: 2,//change to 30
        rateOfDecentVideos:0,//change to 0.5
        nrOfVotes:7,
        nameOfnextRank:'E',
        nameOfpreviosRank:'C',
        nameInDatabase:'D'
    },
    E: {
        nrOfVideos: 7,//change to 100
        nrOfFollowers: 4,//change to 250
        nrOfGoodVids: 2,//change to 50
        nrOfDecentVids: 2,//change to 100
        rateOfDecentVideos:0,//change to 0.75
        nrOfVotes:10,
        nameOfnextRank:'top',
        nameOfpreviosRank:'D',
        nameInDatabase:'E'
    }
}