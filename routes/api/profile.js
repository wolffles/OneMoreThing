const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const validateProfileInput = require('../../validation/profile')

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

//@route    POST api/profile/
//@desc     Create user profile
//@access   private
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation 
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //Get fields 
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    // if (req.body.company) profileFields.company = req.body.company;
    // if (req.body.website) profileFields.website = req.body.website;
    // if (req.body.location) profileFields.location = req.body.location;
    // if (req.body.bio) profileFields.bio = req.body.bio;
    // if (req.body.status) profileFields.status = req.body.status;
    // if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // //Skills - Split into array
    // if (typeof req.body.skills !== 'undefined') {
    //   profileFields.skills = req.body.skills.split(',');
    // }
    // //Social
    // profileFields.social = {};
    // if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    // if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    // if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    // if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    // if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
        } else {
          //create

          // Check to see if a handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }

            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          })
        }
      });
  }
);



//@route    GET api/profile/
//@desc     gets current user's profile
//@access   private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate({path:'posts', select: ['title', 'body', 'date', 'id', 'img', 'likes'], populate: {path: "profile", select: "handle"}})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err)) // catch for findOne
});

//@route    GET api/profile/handle/:handle
//@desc     Get profile by handle
//@access   Public

router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user"
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public

router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .populate('posts')
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user"
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({ Profile: "There is no profile for this user" }));
});


//@route    DELETE api/profile
//@desc     Delete User and profile
//@access   private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true })
        )
    });
});


module.exports = router;