import { Router } from "express";
const router = Router();

import {
    insertarCategoria, 
    mostrarCategorias,
    eliminarCategoria,
    editarCategoria,
    actualizarCategoria } from "../controllers/categoriasController.js"

router.get('/admin/categorias', mostrarCategorias);
router.post("/insertar", insertarCategoria);
router.get("/eliminar/:idCategoria", eliminarCategoria);
router.get("/editar/:idCategoria",editarCategoria);
router.post("/actualizar/:idCategoria",actualizarCategoria)

export default router;