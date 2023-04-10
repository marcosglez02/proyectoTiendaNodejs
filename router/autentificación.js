import { Router } from "express";
import { validarCredenciales } from "../controllers/autentificacion.js";
import { eliminarJWT } from "../JWT.js";
const router = Router();

router.get('/admin/login', (req,res)=>{
    res.render('admin/login.html')
})

router.post('/admin/productos', validarCredenciales)
router.post('/admin/cerrarSesion', eliminarJWT)


export default router;