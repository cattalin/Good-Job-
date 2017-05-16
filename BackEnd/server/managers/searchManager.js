const mongoose = require ('mongoose');
const config = require ('../config/database');
const User = require('../models/user');
const Video = require('../models/video');
const Voter = require('../models/voter');




module.exports.getVideosAndUsers = function(searchstring, callback)
{
    let q = {
        select:searchstring
    }
    Video.getByTitleOrDescriptionOrUsername(q,(err,result)=>{
        callback(err,result);
    })
}