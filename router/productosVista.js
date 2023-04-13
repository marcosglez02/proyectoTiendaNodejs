import { Router } from "express";
const router = Router();

import{mostrarProductos,filtro,productosClic} from "../controllers/productosVista.js"

router.get("/productos",mostrarProductos)
router.post("/filtroCategoria",filtro)
router.post("/productosClic",productosClic)



export default router;