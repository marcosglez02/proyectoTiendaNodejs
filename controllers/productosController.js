import { pool } from "../db.js";
import cloudinary from "../cloudinary.js";
export const mostrarProductos = async (req, res) => {
  const [rows] = await pool.query("select * from productos");
  const [categorias] = await pool.query("select * from categorias");
  res.render("admin/productos.html", {
    productos: rows,
    categorias: categorias,
    titulo: "Productos",
  });
};

const eliminarTemporal = (filePath) => {
	// Función para eliminar las imagenes temporales.
	try {
		fs.unlinkSync(filePath);
		console.log("Archivo removido");
	} catch (err) {
		console.error("Error ", err);
	}
}

export const insertarProductos = async (req, res) => {
  try {
    // Validamos que nos envíen algún archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se encontró ninguna imágen");
    }

    // Extraemos el archivo de la request el nombre "file" debe coincidir con el valor del atributo name del input
    const file = req.files.img;
    console.log(file)
    // Hacemos uso de cloudinary para subir el archivo
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "productos", // Asignamos la carpeta de destino
    });
    eliminarTemporal(file.tempFilePath);
    // Extraemos la url pública del archivo en cloudinary
    const url = `${uploaded.public_id}.${uploaded.format}`; // Se obtienenla URL de la imagen en Cloudinary
    console.log(url)
    const nuevoProducto = {
      idProducto: req.body.idProducto,
      nombreProducto: req.body.nombreProducto,
      descripcion: req.body.descripcion,
      cantidad: parseInt(req.body.cantidad),
      precio: parseFloat(req.body.precio),
      idCategoria: parseInt(req.body.idCategoria),
      estatus: 1,
      img: url,
    };
    // Se insertan los campos
    await pool.query("insert into productos set ?", [
      nuevoProducto,
    ]);
    // Se redirecciona a la página de productos
    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Sucedio un error");
  }
};
//Función para desactivar los productos.
export const eliminarProducto = async (req, res) => {
	const { idProducto } = req.params;
	const [rows] = await pool.query("SELECT estatus FROM productos WHERE idProducto = ?", [idProducto]);
	const estatus = rows[0].estatus;	//obtención del estado.


	if (estatus == 1) {	//Se realiza el cambio del estado.
		await pool.query("UPDATE productos set estatus = 0 WHERE idProducto = ?", [idProducto]);
	} else {
		await pool.query("UPDATE productos set estatus = 1 WHERE idProducto = ?", [idProducto]);
	}
	res.redirect("/admin/productos");
};
export const editarProducto = async(req,res)=>{
  const { idProducto } = req.params;
    const [resultado] = await pool.query("select * from productos WHERE idProducto = ?", [idProducto]);
    const [categorias] = await pool.query("select * from categorias");
    res.render("admin/productosActu.html", { producto: resultado[0], categorias:categorias, titulo:"Editar Producto" });
}
export const actualizarProducto = async(req,res)=>{
  const { idProducto } = req.params;
    let nuevoProducto = {
      nombreProducto: req.body.nombreProducto,
      descripcion: req.body.descripcion,
      cantidad: parseInt(req.body.cantidad),
      precio: parseFloat(req.body.precio),
      idCategoria: parseInt(req.body.idCategoria),
    };
    if(req.files!=null){
      // Extraemos el archivo de la request el nombre "file" debe coincidir con el valor del atributo name del input
      const file = req.files.img;
      console.log(file)
      // Hacemos uso de cloudinary para subir el archivo
      const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "productos", // Asignamos la carpeta de destino
      });
      eliminarTemporal(file.tempFilePath);
      // Extraemos la url pública del archivo en cloudinary
      const url = `${uploaded.public_id}.${uploaded.format}`; // Se obtienenla URL de la imagen en Cloudinary
      console.log(url)
      nuevoProducto.img = url
    }
    await pool.query("update productos set ? WHERE idProducto = ?", [nuevoProducto, idProducto]);
    res.redirect("/admin/productos");
}
