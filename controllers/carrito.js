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

export const realizarCompra = async(req,res)=>{
	try{
		const idUsuario = req.body.id;
		console.log(idUsuario)
		// Obtencion de datos
		let { carrito, pago } = req.body;

		try {
			// Conversion de string obtenido a array
			carrito = JSON.parse(carrito);
		} catch (error) {
			return res.status(400).send("Tu carrito de compras es invalido");
		}
		
		// idUsuario
		if (typeof idUsuario !== "number" || idUsuario < 0 || isNaN(idUsuario)) {
			return res.status(400).send("Tu usuario es invalido");
		}

		// Tipo valido valido
		if (typeof pago !== "string") {
			return res.status(400).send("Tu método de pago es invalido");
		}
		// Verificación tipo de pago
		if(pago!="Crédito" && pago!="Débito"){
			return alert("Introduce un método de pago válido")
		}
		let detallesVentas = "INSERT INTO detallesVentas(idVenta, idProducto, cantidad) VALUES "

		let totalCompra = 0;

		for (const producto of carrito) {
			// Consulta para obtener informacion del producto
			let [[result]] = await pool.query("SELECT * FROM productos WHERE idProducto = ?", [producto.idProducto]);

			// Validacion que el producto exista
			if (result === undefined || result === null) {
				return res.status(400).send("Un producto que intentas comprar no existe");
			}

			// Validar cantidad de producto
			if (producto.cantidad <= 0) {
				return res.status(400).send("Un producto que intentas comprar no cuenta con stock");
			}

			// Validar stock de producto
			if (result.cantidad <= 0) {
				return res.status(400).send("Un producto que intentas comprar no cuenta con stock");
			}

			// Validacion de stock
			if (producto.cantidad > result.cantidad) {
				return res.status(400).send("Un producto que intentas comprar no cuenta con el stock suficiente");
			}
			detallesVentas += `(LAST_INSERT_ID(), ${escape(producto.idProducto)}, ${escape(producto.cantidad)}),`;
			totalCompra += parseFloat(result.precio)*parseFloat(producto.cantidad)
			
		}
		// Se comienza una transacción en mysql
		await pool.query("START TRANSACTION");

		// Se realiza la nueva venta
		await pool.query("INSERT INTO ventas set fecha = CURRENT_TIMESTAMP, ?", [{totalCompra, idUsuario, pago}]);

		// Elimina coma final de venta detalle
		detallesVentas = detallesVentas.slice(0, -1);
		await pool.query(detallesVentas);
		await pool.query("COMMIT");

		// Mandamos el mensaje al usuario
		return res.status(200).send("Se realizó la venta exitosamente");

	}catch(error){
		console.log(error);
		await pool.query("ROLLBACK");
		return res.status(400).send("No se pudo realizar la venta");
	}
}
