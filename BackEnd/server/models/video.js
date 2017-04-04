const mongoose = require('mongoose');
const config = require('../config/database');

VideoSchema = mongoose.Schema({
    link: String,
    title: String,
    description: String,
    rating: Number,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

Video = module.exports = mongoose.model('Video', VideoSchema);

module.exports.addVideo = function(newVideo, callback){
    newVideo.save(callback);
}