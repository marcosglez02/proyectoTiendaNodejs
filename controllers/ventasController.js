import { pool } from "../db.js";

export const mostrarVentas = async (req, res) => {
    const [rows] = await pool.query("select * from ventas");

    const valores={
        ventas:rows,
        titulo:"Ventas"
       }
        res.render('admin/ventas.html',valores)
};

export const mostrarDetalle =  async (req,res)=>{
    const { idVenta } = req.params;
    try{

    const [usuario] = await pool.query("select idUsuario from ventas where idVenta = ?", [idVenta])
    console.log(usuario)
    const [infoUsuario] = await pool.query("select * from usuarios where idUsuario = ?", [usuario[0].idUsuario])
    console.log(infoUsuario)
    const [detalle] = await pool.query("SELECT productos.nombreProducto, productos.precio, categorias.nombreCategoria, productos.img, detallesVentas.cantidad FROM detallesVentas JOIN productos ON detallesVentas.idProducto = productos.idProducto JOIN categorias ON productos.idCategoria = categorias.idCategoria where detallesVentas.idVenta = ?;", [idVenta]);
    console.log(detalle)

    res.render('admin/ventasInfo.html',{usuario:infoUsuario[0], detalleVenta:detalle, titulo:"Detalle venta"})
    }catch(error){
        console.log(error)
    }
}