import { pool } from "../db.js";
export const obtenerCarrito = async (req, res) => {
	try {
		let { idProducto } = req.body;

		const [resultado] = await pool.query("SELECT idProducto, nombreProducto, precio, img, cantidad, idCategoria FROM productos WHERE estatus = 1 AND idProducto = ?", [idProducto]);
		
        // Obtenemos la cátegoria
        const [categoria] = await pool.query("select nombreCategoria from categorias WHERE idCategoria = ?", [resultado[0].idCategoria]);

		if (!resultado[0]) {
			return res.status(400).send("El producto no existe o está deshabilitado");
		}

		let producto = {
			idProducto: resultado[0].idProducto,
			nombreProducto: resultado[0].nombreProducto,
			precio: parseFloat(resultado[0].precio),
            categoria:categoria[0].nombreCategoria,
			img: resultado[0].img,
			cantidad: parseInt(resultado[0].cantidad),
		}
        
		return res.json(producto);
	} catch (error) {
		console.log(error);
		return res.status(400).send("El producto no existe o está deshabilitado");
	}
};
