'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db');
var jwt    = require('jsonwebtoken');
var app = express();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', function(req, res, next) {
  console.log(req);
  let password = req.body.password,
      name = req.body.username;


  db.model.User.model.findOne({ where: {
    firstName: name,
    password: password
  }}).then(function (user) {
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {


        var token = jwt.sign({user: user.get('name')}, 'blahtest', {
          expiresIn: '1440m',
          algorithm: 'HS256'
        });

        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
      }
  });
});


// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    console.log(token);
    // verifies secret and checks exp
    jwt.verify(token, 'blahtest', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});


router.post('/api',function(req, res, next) {
  res.render('index', { title: 'Express' });
})




module.exports = router;
