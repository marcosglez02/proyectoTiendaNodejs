import { Router } from "express";
const router = Router();
import fileUpload from 'express-fileupload';
import { validarJWT } from "../JWT.js";
import {insertarProductos, mostrarProductos, eliminarProducto,editarProducto, actualizarProducto} from "../controllers/productosController.js"

//router.use(cookieParser())
router.get('/admin/productos', validarJWT, mostrarProductos);
router.post('/insertarProducto',validarJWT, fileUpload({
    useTempFiles: true,
    limits: {fileSize: 2 * 1024 * 1024}    //Se tiene un limite de 2mb por archivo
}), insertarProductos)
router.get("/eliminarProducto/:idProducto",validarJWT, eliminarProducto);
router.get("/editarProducto/:idProducto",validarJWT,editarProducto);
router.post("/actualizarProducto/:idProducto",validarJWT,actualizarProducto)

export default router;