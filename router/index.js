const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");

router.get('/',(req,res)=>{
    // res.send("<h1>Iniciamos con express</h1>")
    res.render('index.html')
});
router.get('/carrito.html',(req,res)=>{
    // res.send("<h1>Iniciamos con express</h1>")
    res.render('carrito.html')
});

module.exports=router;