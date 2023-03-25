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


