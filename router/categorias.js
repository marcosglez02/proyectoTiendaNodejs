import { Router } from "express";
const router = Router();
import { validarJWT } from "../JWT.js";
import {
    insertarCategoria, 
    mostrarCategorias,
    eliminarCategoria,
    editarCategoria,
    actualizarCategoria } from "../controllers/categoriasController.js"

router.get('/admin/categorias',validarJWT, mostrarCategorias);
router.post("/insertar",validarJWT, insertarCategoria);
router.get("/eliminar/:idCategoria",validarJWT, eliminarCategoria);
router.get("/editar/:idCategoria",validarJWT,editarCategoria);
router.post("/actualizar/:idCategoria",validarJWT,actualizarCategoria)

export default router;