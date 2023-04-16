import { Router } from "express";
const router = Router();
import { validarJWT } from "../JWT.js";
import { mostrarDetalle, mostrarVentas } from "../controllers/ventasController.js";

router.get('/admin/ventas', validarJWT, mostrarVentas)
router.get('/admin/ventas/informacion/:idVenta', validarJWT, mostrarDetalle)
export default router;