import { Router } from "express";
const router = Router();

import{mostrarProductos,filtro} from "../controllers/productosVista.js"

router.get("/productos",mostrarProductos)
router.post("/filtroCategoria",filtro),
router.post("/productosClic/:idProductos")




export default router;