const mongoose = require('mongoose');
const config = require('../config/database');

// Tag Schema
const TagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  videos: {
    type: Array,
    required: true
  }
});

const Tag = module.exports = mongoose.model('Tag', TagSchema);


module.exports.getAllTags = function(callback)
{
    Tag.find(callback)/*=>{
           if(err) return console.error(err);
           console.log(tag);
          return tag;
       });*/
}

module.exports.addTag = function(tagData)
{
    let newTag = new Tag({
        name: tagData.name,
        videos: tagData.videos
    });
    newTag.save((err,saved)=>{
                  if(err) console.log('bp');
                  console.log('SAVED');
              });
}

