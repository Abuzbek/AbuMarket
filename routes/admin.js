const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Product = require('../model/ProductAdd')
// ============== rasim images fayiliga yuklash jarayoni   ==============
const upload = require('../helper/file')
// ============== rasim images fayiliga yuklash jarayoni   ==============
const eA = require('../helper/eA')
/* GET home page. */
router.get('/abuzcoder',eA,  (req, res, next)=> {
    res.render('abuzcoder', {
      title: 'ASSALOMU ALEKUM HOJAYIN',
    });
        
});
router.post('/abuzcoder', upload.single('img'),  (req, res, next)=> {
  try{
    console.log(req.body); 
    const product = new Product({
    name:req.body.name,
    description:req.body.description,
    imb_score:req.body.imb_score,
    category:req.body.category,
    money:req.body.money,
    img:req.file.filename,
    feature:req.body.feature,
    sale :req.body.sale
  })
  product.save((err,product)=>{
    if(err){
      console.log(err);
    }
    else{
      req.flash('info' , `Maxsulotimiz muaffaqiyatli qo'shildi hohlasangiz kirib ko'ring`)
      res.redirect('/abuzcoder')
    }
  })
  console.log(req.file);
  }catch(error){
    console.log(error);
  }
  
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
