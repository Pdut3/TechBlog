const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        }
      });
  
      
      const posts = postData.map((post) => post.get({ plain: true }));
  
      
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



  router.get('/newPost', withAuth, (req, res) => {
      res.render('/newPost');
    });

    router.get('/edit: id', withAuth, async (req, res) => {
        try {
              const postData = await Post.findByPk(req.params.id, {
                
              });
          
              const post = postData.get({ plain: true });
          
              res.render('editPost', {
                post,
                logged_in: req.session.logged_in
              });
            } catch (err) {
              res.status(500).json(err);
            }
          });
          





        res.render('/newPost');
      





  module.exports = router;