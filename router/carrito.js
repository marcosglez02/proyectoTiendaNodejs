import { Router } from "express";
import { obtenerCarrito,realizarCompra } from "../controllers/carrito.js";
import { validarJWTCliente } from "../JWT.js";
const router = Router();

router.get('/carrito', (req,res)=>{
    res.render('carrito.html')
})
router.post('/obtenerProducto',obtenerCarrito)
router.post('/realizarCompra', validarJWTCliente, realizarCompra)
export default router;