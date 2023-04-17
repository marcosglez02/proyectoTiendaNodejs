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

export const registroUsuarios = async(req,res)=>{
  try{
    // Cambiar returns a un limpiar, y añadirles un alert para el usuario

    if (req.body.usuario == "") {
      return res.status(400).send("Ingrese un usuario, no puede estar vacío.")
      }
      
      if (req.body.nombreUsuario == "") {
      return res.status(400).send("Ingrese su nombre, no puede estar vacío.")
      }
      
      if (req.body.apellidoUsuario == "") {
      return res.status(400).send("Ingrese su apellido, no puede estar vacío.")
      }
      
      if (req.body.telefonoUsuario == "") {
      return res.status(400).send("Ingrese su número telefónico, no puede estar vacío.")
      }
      
      if (req.body.correoUsuario == "") {
      return res.status(400).send("Ingrese su correo electrónico, no puede estar vacío.")
      }
      
      if (req.body.contraseñaUsuario == "") {
      return res.status(400).send("Ingrese su contraseña, no puede estar vacía.")
      }
      
      if (req.body.domicilioUsuario == "") {
      return res.status(400).send("Ingrese su domicilio, no puede estar vacío.")
      }
      
      if (req.body.contraseñaUsuario != req.body.contraConfirmar) {
      return res.status(400).send("Contraseñas diferentes.")
      }
      
      if (req.body.contraseñaUsuario.length < 5) {
      return res.status(400).send("La contraseña no puede ser menor de 5 carácteres.")
      }
      
      if (req.body.contraseñaUsuario.length > 20) {
      return res.status(400).send("La contraseña no puede ser mayor a 20 carácteres.")
      }
      
      if (req.body.usuario.length > 20) {
      return res.status(400).send("El nombre del usuario no puede ser mayor a 20 carácteres.")
      }

      const nuevoUsuario = {
        idUsuario: req.insertidUsuario,
        usuario: req.body.usuario,
        nombreUsuario: req.body.nombreUsuario,
        apellidoUsuario: req.body.apellidoUsuario,
        domicilioUsuario: req.body.domicilioUsuario,
        telefonoUsuario: req.body.telefonoUsuario,
        correoUsuario: req.body.correoUsuario,
        contraseñaUsuario: req.body.contraseñaUsuario,
        estado: 1
      }
      await pool.query("insert into usuarios set ?", [nuevoUsuario])
      res.redirect('/login')
    }catch(error){
    res.status(400).send("Sucedió un error" + error)
    console.log(error)
  }
}

export const iniciarSesUsuario = async (req, res)=>{
  const { usuario, contraseña } = req.body;
try{
  const [resultado] = await pool.query("select * from usuarios where usuario = ?",[usuario]);

  if (resultado[0] == undefined) {
    return res.status(400).send("No existe ese usuario");
  }
  if (contraseña != resultado[0].contraseñaUsuario) {
    return res.status(400).send("Usuario y/o contraseña incorrectos");
  }else{
    const token = await generarJWT(resultado[0].idUsuario)
    res.cookie("Sesion",token)

    res.redirect('/')
  }
}catch(error){
  console.log(error.message)
}
}
