import { pool } from "../db.js";

export const mostrarProductos = async (req, res) => {
  const [rows] = await pool.query("select * from productos");
  const [categorias] = await pool.query("select * from categorias");
  res.render("productos.html", {
    productos: rows,
    categorias: categorias,
    titulo: "Productos",
  });
};

export const mostrarCategorias = async (req, res) => {
    const [rows] = await pool.query("select * from categorias");
    res.render("admin/categorias.html", { categorias: rows,titulo:"Categorías" });
  };

  export const showCategorias = async (req, res) => {
    const [rows] = await pool.query("select * from categorias");
    res.render("index.html", { categorias: rows,titulo:"Categorías" });
  };

