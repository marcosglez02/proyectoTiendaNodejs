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
    if(req.body.contraseñaUsuario != req.body.contraConfirmar){
      console.log("Contraseñas diferentes!!!")
      return res.redirect('/registro')
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
  res.redirect('/')
  }catch(error){
    res.status(400).send("Secedió un error")
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
    const token = await generarJWT(resultado[0].usuario)
    res.cookie("Sesion",token)

    res.redirect('/')
  }
}catch(error){
  console.log(error.message)
}
}
