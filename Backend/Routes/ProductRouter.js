const ensureAuthentication = require('../Middlewares/Auth');


const router  =require('express').Router();

router.get('/', ensureAuthentication,(req,res)=>{
    console.log(" ---- logged in user detail ----",req.user)
res.status(200).json([
    {
        name:"Mobile",
        brand:"Apple",
        model:"iPhone 12",
        price:999.99
    },
    {
        name:"Laptop",
        brand:"Lenovo",
        model:"ThinkPad X1 Carbon",
        price:1499.99
    }
])
});


module.exports = router;