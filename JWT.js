import jwt from 'jsonwebtoken'
import { TOKENS } from './config.js'
import cookieParser from 'cookie-parser'

export const generarJWT = (uid='')=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid};

        jwt.sign(payload, TOKENS,{
            expiresIn:'1h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })

    })
}

export const validarJWT = (req, res, next)=>{
    const token = req.cookies.Administrador;
    if (!token){
       return res.redirect('/admin/login')
    }

    try{

        jwt.verify(token, TOKENS);
        next();
    }catch(error){
        console.log(error);
       return res.status(401).send("Token no válido")
    }

}

export const validarJWTCliente = (req, res, next)=>{
    const token = req.cookies.Sesion;
    if (!token){
       return res.redirect('/login')
    }

    try{

        const verificacion = jwt.verify(token, TOKENS);
        req.body.id = verificacion.uid;
        next();
    }catch(error){
        console.log(error);
       return res.status(401).send("Token no válido")
    }

}

export const eliminarJWT = (req, res, next)=>{
    const token = req.cookies.Administrador;

    if (!token){
        return res.redirect('/admin/login')
    }
    res.clearCookie('Administrador')
    res.redirect('/admin/login')
}

export const validarSesion = (nombre="")=>{
    return new Promise((resolve, reject)=>{
        const token = nombre;
        jwt.verify(token, TOKENS, (err, decoded) => {
            if (err) {
              resolve("")
            } else {
              // leer el payload del JWT
              const payload = decoded;
              resolve(payload.uid)
            }
          })

    })
}

export const cerrarSesion = (req,res)=>{
    res.clearCookie('Sesion')
    res.redirect('/')
}
