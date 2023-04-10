import { validarSesion } from "../JWT.js";
import { pool } from "../db.js";

export const mostrarProductos = async (req, res) => {
  const [rows] = await pool.query("select * from productos");
  const [categorias] = await pool.query("select * from categorias");

  const usuario = await validarSesion(req.cookies.Sesion)
  console.log(usuario)
  res.render("productos.html", {
    productos: rows,
    categorias: categorias,
    titulo: "Productos",
    cliente:usuario
  });
};

export const mostrarCategorias = async (req, res) => {
    const [rows] = await pool.query("select * from categorias");
    res.render("admin/categorias.html", { categorias: rows,titulo:"Categorías" });
  };

  export const showCategoriasProductos = async (req, res) => {
    const [rows] = await pool.query("select * from productos");
    const [categorias] = await pool.query("select * from categorias");

    const usuario = await validarSesion(req.cookies.Sesion)

    res.render("index.html", { productos: rows,categorias: categorias,titulo:"Categorías y Productos",cliente:usuario });
  };


  export const filtro = async (req, res) => {
    const idCategoria= req.body.idCategoria
    const [categorias] = await pool.query("select * from categorias");

    const usuario = await validarSesion(req.cookies.Sesion)
    console.log(usuario)
    if(idCategoria=="#"){
      const [rows] = await pool.query("select * from productos");
      res.render("productos.html", {
        productos: rows,
        categorias: categorias,
        titulo: "Productos",
        cliente:usuario
      });
    }else{
  
  
    const [rows] = await pool.query("select * from productos where idCategoria= ?",[idCategoria]);
    res.render("productos.html", {
      productos: rows,
      categorias: categorias,
      titulo: "Productos",
      cliente:usuario
    });
  }
  
  };