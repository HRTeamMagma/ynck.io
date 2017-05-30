const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    url: process.env.REDISCLOUD_URL
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
