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

  export const showCategoriasProductos = async (req, res) => {
    const [rows] = await pool.query("select * from productos");
    const [categorias] = await pool.query("select * from categorias");
    res.render("index.html", { productos: rows,categorias: categorias,titulo:"Categorías y Productos" });
  };


  export const filtro = async (req, res) => {
    const idCategoria= req.body.idCategoria
    const [categorias] = await pool.query("select * from categorias");
    if(idCategoria=="#"){
      const [rows] = await pool.query("select * from productos");
      res.render("productos.html", {
        productos: rows,
        categorias: categorias,
        titulo: "Productos",
      });
    }else{
  
  
    const [rows] = await pool.query("select * from productos where idCategoria= ?",[idCategoria]);
    res.render("productos.html", {
      productos: rows,
      categorias: categorias,
      titulo: "Productos",
    });
  }
  
  };