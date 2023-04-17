import { pool } from "../db.js";

export const mostrarCategorias = async (req, res) => {
  const [rows] = await pool.query("select * from categorias");
  res.render("admin/categorias.html", { categorias: rows,titulo:"Categorías" });
};

export const insertarCategoria = async (req, res) => {
  const nuevaCate = req.body;
  try {
    await pool.query("insert into categorias set ?", [nuevaCate]);
    res.redirect("/admin/categorias");
  } catch (error) {
    // Si se produce un error, verifica si es debido a la restricción única en la columna "nombreCategoria".
    if (error.code === 'ER_DUP_ENTRY') {
      // Si es así, la categoría ya existe en la base de datos.
      // En este caso, puedes proporcionar un mensaje de error al usuario y redirigirlo a la página de inserción de categoría.
      res.status(400).send('La categoría ya existe en la base de datos.');
    } else {
      // Si se produce un error diferente, muestra un mensaje de error genérico y registra el error en el servidor.
      console.error(error);
      res.status(500).send('Se produjo un error al insertar la categoría.');
    }
  }
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
  try{
    const { idCategoria } = req.params;
    const nuevaCategoria = req.body;
    await pool.query("update categorias set ? WHERE idCategoria = ?", [nuevaCategoria, idCategoria]);
    res.redirect("/admin/categorias");
  }catch (error) {  
    if (error.code === 'ER_DUP_ENTRY') {
      // Si es así, la categoría ya existe en la base de datos.
      // En este caso, puedes proporcionar un mensaje de error al usuario y redirigirlo a la página de inserción de categoría.
      res.status(400).send('La categoria ya existe en la base de datos.');
    } else {
      // Si se produce un error diferente, muestra un mensaje de error genérico y registra el error en el servidor.
      console.error(error);
      res.status(500).send('Se produjo un error al insertar la categoria.');
    }
  }
};