const express = require('express');
const router = express.Router();
const passport = require('passport')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validation/post')

router.get('/test', (req,res) => res.json({msg: 'Post Works'}));

module.exports = router;

//@route    GET api/posts
//@desc     gets all posts
//@access   public 
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@route  GET api/posts
//@desc   gets a post by id
//@access Public
router.get('/:id', (req,res)=>{
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({nopostFound: "no post found"}));
})


//@route    POST api / posts
//@desc     Creates a post
//@access   private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    img: req.body.img,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));

})

//@route    POST api / posts
//@desc     Update a post
//@access   private
router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        //validating post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User is not authorized" });
        }
        post.title= req.body.title;
        post.body= req.body.body;
        post.img= req.body.img;
        post.save().then(post => res.json(post));
      });
    });
})

//@route    POST api/posts/:id
//@desc     Delete a post
//@access   private
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        //validating post owner
        if(post.user.toString() !== req.user.id) {
          return res.status(401).json({notauthorized: "User is not authorized"});
        }
        // Delete
        post.remove().then(() => res.json({success: true}));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
});


module.exports = router