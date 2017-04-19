const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Video = require('../models/video');
const Tag = require('../models/tag');

//post a video
router.post('/upload', (req, res, next) => {
  let newVideo = new Video({
    link: req.body.link,
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    username: req.body.username,
    rating: req.body.rating
  })

  Video.addVideo(newVideo, (err, video) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to upload video' });
    } else {
      res.json({ success: true, msg: 'Video saved' });
    }
  })
});

// Search
router.post('/search', (req, res, next) => {
  /*Tag.addTag({name:'test1',videos:'NOTHING'});
  Tag.addTag({name:'test2',videos:'NOTHING2'});*/
  if (req.body.type == 'reqTags') {
    Tag.getAllTags((err, tags) => {
      res.json({ tags: tags });
    })

  }
});

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
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

router.get('/feed', (req, res) => {
  const query = {
    skip: req.query.skip,
    limit: req.query.limit,
    sort: req.query.sort,
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

router.get('/userprofile', (req, res) => {

  User.getUserByUsername(req.query.username, (err, user) => {

    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    res.json({ success: true, user: user });
    //console.log(user);

  })
});

module.exports = router;
