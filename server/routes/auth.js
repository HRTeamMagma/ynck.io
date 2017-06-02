const express = require('express');
const middleware = require('../middleware');
const ProfileController = require('../controllers').Profiles;

const router = express.Router();

router.route('/')
  .get((req, res) => {
    if (!req.user) {
      var loggedInUser = false;
    } else {
      loggedInUser = req.user;
    }
    res.render('index.ejs', { user: loggedInUser });
  });

router.route('/user/:id')
  .get((req, res) => {
    if (!req.user) {
      var loggedInUser = false;
    } else {
      var loggedInUser = req.user;
    }
    res.render('index.ejs', { user: loggedInUser });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/user') //change this route????
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs', { 
      user: req.user // get the user out of session and pass to template
    });
  });

//place holder server route, so shop renders on react router call
router.route('/shop') //change this route????
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs', { 
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
