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

export const eliminarJWT = (req, res, next)=>{
    const token = req.cookies.Administrador;

    if (!token){
        return res.redirect('/admin/login')
    }
    res.clearCookie('Administrador')
    res.redirect('/admin/login')
}
