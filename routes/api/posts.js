const express = require('express');
const router = express.Router();

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

router.post('/', passport.authenticate)