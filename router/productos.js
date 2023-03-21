import { Router } from "express";
const router = Router();
import fileUpload from 'express-fileupload';

import {insertarProductos, mostrarProductos, eliminarProducto,editarProducto, actualizarProducto} from "../controllers/productosController.js"

router.get('/admin/productos', mostrarProductos);
router.post('/insertarProducto', fileUpload({
    useTempFiles: true,
    limits: {fileSize: 2 * 1024 * 1024}    //Se tiene un limite de 2mb por archivo
}), insertarProductos)
router.get("/eliminarProducto/:idProducto", eliminarProducto);
router.get("/editarProducto/:idProducto",editarProducto);
router.post("/actualizarProducto/:idProducto",actualizarProducto)

export default router;