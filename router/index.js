import express from "express";
const router = express.Router();
import bodyParse from"body-parser";
import request from "http";

router.get('/',(req,res)=>{
    const valores={
        titulo:"Inicio"
       }
        res.render('index.html',valores)
});

router.get('/admin/promociones',(req,res)=>{
    const valores={
        titulo:"Promociones"
       }
        res.render('admin/promociones.html',valores)
});
router.get('/admin/ventas',(req,res)=>{
    const valores={
        titulo:"Ventas"
       }
        res.render('admin/ventas.html',valores)
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
export default router;