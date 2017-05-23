const mongoose = require ('mongoose');
const config = require ('../config/database');
const User = require('../models/user');
const Video = require('../models/video');
const Voter = require('../models/voter');




module.exports.getVideosAndUsers = function(query, callback)
{
    Video.getByTitleOrDescriptionOrUsername(query,callback);
}

module.exports.countVideosAndUsers = function(query, callback)
{
    Video.countByTitleOrDescriptionOrUsername(query, callback);
}