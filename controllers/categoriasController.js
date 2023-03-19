import { pool } from "../db.js";

export const mostrarCategorias = async (req, res) => {
  const [rows] = await pool.query("select * from categorias");
  res.render("admin/categorias.html", { categorias: rows,titulo:"Categorías" });
};

export const insertarCategoria = async (req, res) => {
  const nuevaCate = req.body;
  await pool.query("insert into categorias set ?", [nuevaCate]);
  res.redirect("/admin/categorias");
};

export const eliminarCategoria = async (req, res) => {
    const { idcategoria } = req.params;
    const resultado = await pool.query("delete from categorias WHERE idcategoria = ?", [idcategoria]);
    if (resultado.affectedRows === 1) {
      res.json({ message: "Se eliminó la categoría" });
    }
    res.redirect("/admin/categorias");
  };

export const editarCategoria = async (req, res) => {
    const { idcategoria } = req.params;
    const [resultado] = await pool.query("select * from categorias WHERE idcategoria = ?", [idcategoria]);
    res.render("admin/categoriasActu.html", { categorias: resultado[0],titulo:"Editar categoría" });
};
export const actualizarCategoria = async (req, res) => {
    const { idcategoria } = req.params;
    const nuevaCategoria = req.body;
    await pool.query("update categorias set ? WHERE idcategoria = ?", [nuevaCategoria, idcategoria]);
    res.redirect("/admin/categorias");
};
