var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Auth Route' });
});

router.post('/login', function(req, res, next) {
  knex.raw(`select * from users where username = '${req.body.username}' and password = '${req.body.password}'`)
      .then((data) => {
        if (data.rows[0].id){
          res.cookie('loggedIn', 'true');
          res.redirect('/dash');
        } else {
          res.redirect('/auth')
        }
      }).catch((err) => {
        console.log(err);
        res.redirect('/auth')
      });
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('loggedIn');
  res.redirect('/auth');
});

module.exports = router;
