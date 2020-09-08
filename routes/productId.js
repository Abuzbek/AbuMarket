const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Product = require('../model/ProductAdd')
const eA = require('../helper/eA')

router.get('/product/:id' ,eA,(req,res,next)=>{
    Product.findById(req.params.id , (err,product)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('product' , {
                title:product.name,
                // products:product
            })
        }
       
    })
})



module.exports = router;
