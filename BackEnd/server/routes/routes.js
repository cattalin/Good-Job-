const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Video = require('../models/video');
const Comment = require('../models/comment');
const Follow = require('../models/follow');
const Tag = require('../models/tag');
const RatingManager = require('../managers/ratingManager');
const SearchManager = require('../managers/searchManager');
const ClassManager = require('../managers/classManager');

/*
  -------------------COMMENT STUFF---------------------
*/

//post a comment
router.post('/postComment', (req, res, next) => {
  var newComment={
        userId: req.body.userId,
        username: req.body.username,
        text: req.body.text,
        class: req.body.class,
        videoId: req.body.videoId
    }
    console.log(newComment);
  Comment.addComment(new Comment(newComment), (err, video) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to submit comment.' });
    } 
    else {
      res.json({ success: true, msg: 'Comment posted.' });
    }
  })
});


router.get('/comments', (req, res) => {
  let query = {
    videoId: req.query.videoId
  }
  Comment.getComments(query, (err, comments) => {
    if (err) throw err;
    if (!comments) {
      return res.json({ success: false, msg: 'comments not found' });
    }
    comments.forEach(function (element) {
      console.log(element);
    }, this);

    res.json({ success: true, comments: comments });
  })

})

/*
  -------------------VIDEO STUFF---------------------
*/


//post a video
router.post('/upload', (req, res, next) => {
  let newVideo = {
    link: req.body.link,
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    username: req.body.username,
    rating: req.body.rating,
    class: req.body.class
  }
  console.log('the class is'+newVideo.class)

  Video.addVideo(new Video(newVideo), (err, video) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to upload video' });
    } 
    else {
      let conditions = {
        _id: video._id}
      let data = {
        voterId: newVideo.userId,
        rating: newVideo.rating,
        class: newVideo.class
      }
      RatingManager.rateVideo(conditions, data, (err2, result) => {
        if (err2) {
          console.log('Failed to rate video');
        } else {
           console.log('Video rated');
        }
      })
      res.json({ success: true, msg: 'Video saved' });
    }
  })
});

router.post('/delete', (req, res, next) => {
  let todel=req.body._id;

  Video.removeVideo(todel, (err, user) =>{
    if (err) {
      res.json({ success: false, msg: 'Failed to remove' });
    } else {
      res.json({ success: true, msg: 'removed' });
    }
  })
});

router.post('/deletecomm', (req, res, next) => {
  let todel=req.body._id;
  Comment.removeComment(todel, (err, user) =>{
    if (err) {
      res.json({ success: false, msg: 'Failed to remove' });
    } else {
      res.json({ success: true, msg: 'removed' });
    }
  })
});


//rate a video
router.post('/rate', (req, res, next) => {
  let conditions = {
    _id: req.body._id
  }
  let data = {
    voterId: req.body.userId, 
    rating: req.body.rating
  }
  User.getClassById(data.voterId, (err, cls) => {
    data.class=cls.class;
    if (err) 
      res.json({ success: false, msg: 'Failed' });

    else {
      RatingManager.rateVideo(conditions, data, (err2, result) => {
        if (err2) {
          res.json({ success: false, msg: 'Failed to upload video', result: result });
        } else {
          console.log("rating indeed saved")
          res.json({ success: true, msg: 'Video saved', result: result });
        }
      })
    }
  });
});




router.get('/hasRated',(req, res, next) => {
  let query = {
    videoId: req.query.videoId,
    userId: req.query.userId,
  }
  
  RatingManager.hasRated(query,(err,result)=>{
    console.log("hasrated"+result);
    if(err)
      res.json({success : false, msg: 'could not check the rating', result:0});
    else {
      res.json({success : true, msg: 'rating found', result:result});
    }
  })
});



//update user class
router.get('/updateClass',(req, res, next) => {
  let query = {
    _id : req.query._id
  }
  ClassManager.updateUserClass(query,(err,result)=>{
    if(err)
      res.json({success : false, msg: 'Could not update class', result:result});
    else {
      console.log("class checked");
      res.json({success : true, msg: 'class updated',result:result});
    }
  })
});

//the the basic feed of videos
router.get('/feed', (req, res) => {
  const query = {
    sort: req.query.sort,
    select: req.query.select,
    limit: req.query.limit,
    skip: req.query.skip,
    from: req.query.from,
    to: req.query.to
  }

  Video.getVideos(query, (err, videos) => {
    if (err) throw err;
    if (!videos) {
      return res.json({ success: false, msg: 'Videos not found' });
    }
    videos.forEach(function (element) {
      //console.log(element);
    }, this);

    res.json({ success: true, videos: videos });
  })
});



// Search stuff
router.get('/search', (req, res, next) => {

  /*Tag.addTag({name:'test1',videos:'NOTHING'});
  Tag.addTag({name:'test2',videos:'NOTHING2'});*/
 /* if (req.body.type == 'reqTags') {
    Tag.getAllTags((err, tags) => {
      return res.json({ tags: tags });
    })

  }*/
  SearchManager.getVideosAndUsers(req.query.val,(err,result)=>{

        res.json({sucess:true, videos:result});
  })
});




/*
  -------------------FOLLOWING STUFF---------------------
*/
router.post('/follow', (req, res, next) =>{
  let follow = {
    followerId: req.body.followerId,
    followedId: req.body.followedId
  };
  Follow.addFollower(follow, (err, user) =>{
    if (err) {
      //res.json({ success: false, msg: 'Failed to follow user' });
    } else {
      //res.json({ success: true, msg: 'User followed' });
      
      Follow.countFollowers(follow, (err, count) =>{
        res.json({count:count});
        })

    }
  })

});

router.get('/numberOfFollowers', (req, res) => {

  let follow = {
    followedId: req.query.followedId
  };

  Follow.countFollowers(follow, (err, count) =>{
        res.json({count});
  });
});

router.get('/listOfFollowings', (req, res) => {

  let follow = {
    followerId: req.query.followerId,
  };

  Follow.searchByFollowerId(follow, (err, list) =>{
        res.json({list});
  });
});




/*
  -------------------USER STUFF---------------------
*/
// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    class: req.body.class
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});


// Update User: Name
router.post('/updateName', (req, res, next) => {
  User.updateName({ id: req.body._id, name: req.body.name }, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to update name' });
    } else {
      res.json({ success: true, msg: 'Name updated' });
    }
  });
});

// Update User: Email
router.post('/updateEmail', (req, res, next) => {
  User.updateEmail({ id: req.body._id, email: req.body.email }, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to update e-mail' });
    } else {
      res.json({ success: true, msg: 'E-mail updated' });
    }
  });
});

// Update User: Password
router.post('/updatePassword', (req, res, next) => {
  User.getUserById(req.body._id, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log('aici');
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(req.body.oldPassword, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {

        User.updatePassword({ id: req.body._id, password: req.body.password }, (err, user) => {
          if (err) {
            res.json({ success: false, msg: 'Failed to update password' });
          } else {
            res.json({ success: true, msg: 'Password updated' });
          }
        });

      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      } 
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});


router.get('/viewprofile', (req, res, next) => {
  User.getUserByUsername(req.username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

  });
});


router.get('/userprofile', (req, res) => {//searches for the user by his username

  User.getUserByUsername(req.query.username, (err, user) => {

    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    res.json({ success: true, user: user });
  })
});

router.get('/userprofilebyemail', (req, res) => {

  User.getUserByEmail(req.query.email, (err, user) => {

    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    res.json({ success: true, user: user });

  })
});

module.exports = router;
