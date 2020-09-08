const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Product = require('../model/ProductAdd')
const eA = require('../helper/eA')
/* GET home page. */
router.get('/',eA,  (req, res, next)=> {
  Product.find({},(err , product)=>{
    if (err) {
      console.log(err);
    }
    else {
        res.render('index', {
          title: 'AbuzMarket',
          card:product
        });
    }
  })

});
// router.get('/:id',eA,  (req, res, next)=> {
//   Users.findById({}, (err, user) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         res.render('users', {
//           title: 'Account',
//         });
//         console.log(req.body);
//     }
//   })
// });

module.exports = router;
