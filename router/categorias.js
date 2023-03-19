import { Router } from "express";
const router = Router();

import {
    insertarCategoria, 
    mostrarCategorias,
    eliminarCategoria,
    editarCategoria,
    actualizarCategoria } from "../controllers/categoriasController.js"

//const categoriasController = require('../controllers/categoriasController')

router.get('/admin/categorias', mostrarCategorias);
router.post("/insertar", insertarCategoria);
router.get("/eliminar/:idcategoria", eliminarCategoria);
router.get("/editar/:idcategoria",editarCategoria);
router.post("/actualizar/:idcategoria",actualizarCategoria)

export default router;