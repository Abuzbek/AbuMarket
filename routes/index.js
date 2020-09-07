const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const eA = require('../helper/eA')
/* GET home page. */
router.get('/',eA,  (req, res, next)=> {
  Users.find({}, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', {
        title: 'AbuzMarket',
      });
    }
  })
});

module.exports = router;
