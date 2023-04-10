import { pool } from "../db.js";
import { generarJWT } from "../JWT.js";
import cookieParser from "cookie-parser";


export const validarCredenciales = async (req, res) => {
  const { usuario, contraseña } = req.body;
  
  const [resultado] = await pool.query(
    "select * from administradores where usuarioAdministrador = ?",[usuario]
  );
  if (resultado[0] == undefined) {
    return res.status(400).send("No existe ese usuario");
  }
  if (contraseña != resultado[0].contraseña) {
    return res.status(400).send("Usuario y/o contraseña incorrectos");
  } else {

    const token = await generarJWT(resultado[0].idAdministrador)
    res.cookie('Administrador',token)

    res.redirect('/admin/productos')
  }
};
