const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");

router.get('/',(req,res)=>{
    const valores={
        titulo:"Inicio"
       }
        res.render('index.html',valores)
});

router.get('/admin/formulario.html',(req,res)=>{
    const valores={
        titulo:"Administrador"
       }
        res.render('admin/formulario.html',valores)
});

router.get('/carrito.html',(req,res)=>{
   const valores={
    titulo:"Carrito"
   }
    res.render('carrito.html',valores)
});

router.post('/carrito.html',(req,res)=>{
    const valores={
        titulo:"Carrito"
       }
        res.render('carrito.html',valores)
});
module.exports=router;