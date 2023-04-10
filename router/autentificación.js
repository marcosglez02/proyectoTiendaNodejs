import { Router } from "express";
import { validarCredenciales,registroUsuarios,iniciarSesUsuario } from "../controllers/autentificacion.js";
import { cerrarSesion, eliminarJWT } from "../JWT.js";
const router = Router();

router.get('/admin/login', (req,res)=>{
    res.render('admin/login.html')
})

router.post('/admin/productos', validarCredenciales)
router.post('/admin/cerrarSesion', eliminarJWT)

router.post('/registroUsuarios',registroUsuarios)
router.post('/usuario/iniciarSesion', iniciarSesUsuario)
router.get('/cerrarSesion', cerrarSesion)
export default router;