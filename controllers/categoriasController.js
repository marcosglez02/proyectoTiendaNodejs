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
    const { idCategoria } = req.params;
    const resultado = await pool.query("delete from categorias WHERE idCategoria = ?", [idCategoria]);
    if (resultado.affectedRows === 1) {
      res.json({ message: "Se eliminó la categoría" });
    }
    res.redirect("/admin/categorias");
  };

export const editarCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    const [resultado] = await pool.query("select * from categorias WHERE idCategoria = ?", [idCategoria]);
    res.render("admin/categoriasActu.html", { categorias: resultado[0],titulo:"Editar categoría" });
};
export const actualizarCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    const nuevaCategoria = req.body;
    await pool.query("update categorias set ? WHERE idCategoria = ?", [nuevaCategoria, idCategoria]);
    res.redirect("/admin/categorias");
};
