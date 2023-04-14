import { Router } from "express";
import { obtenerCarrito } from "../controllers/carrito.js";
const router = Router();

router.get('/carrito', (req,res)=>{
    res.render('carrito.html')
})
router.post('/obtenerProducto',obtenerCarrito)

export default router;