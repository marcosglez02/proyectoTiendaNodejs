import { pool } from "../db.js";

export const mostrarProductos = async (req, res) => {
  const [rows] = await pool.query("select * from productos");
  const [categorias] = await pool.query("select * from categorias");
  res.render("productos.html", {
    productos: rows,
    categorias: categorias,
    titulo: "productos",
  });
};

export const mostrarCategorias = async (req, res) => {
    const [rows] = await pool.query("select * from categorias");
    res.render("admin/categorias.html", { categorias: rows,titulo:"Categorías" });
  };

