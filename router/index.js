
import { Router } from "express";
const router = Router();

import{mostrarProductos,mostrarCategorias,showCategoriasProductos} from "../controllers/productosVista.js"
import { validarSesion } from "../JWT.js";
router.get("/productos",mostrarProductos)


router.get("/",showCategoriasProductos)


router.get('/carrito', async (req,res)=>{
const usuario = await validarSesion(req.cookies.Sesion)

   const valores={
    titulo:"Carrito",
    cliente:usuario
   }
    res.render('carrito.html',valores)
});

router.post('/carrito',async (req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
    
    const valores={
        titulo:"Carrito",
        cliente:usuario
       }
        res.render('carrito.html',valores)
});



 router.get('/admin',(req,res)=>{
    const valores={
     titulo:"admin"
    }
     res.render('admin.html',valores)
 });
 
 router.post('/admin',(req,res)=>{
     const valores={
         titulo:"admin"
        }
         res.render('admin.html',valores)
 });


 router.get('/Contactos',async (req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
    const valores={
     titulo:"Contactos",
     cliente:usuario
    }
     res.render('contactos.html',valores)
 });
 
 router.post('/Contactos', async(req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
     const valores={
         titulo:"Contactos",
         cliente:usuario
        }
         res.render('contactos.html',valores)
 });


 router.get('/login',(req,res)=>{
    const valores={
     titulo:"login"
    }
     res.render('login.html',valores)
 });
 
 router.post('/login',(req,res)=>{
     const valores={
         titulo:"login"
        }
         res.render('login.html',valores)
 });




 router.get('/Nosotros', async(req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
    const valores={
     titulo:"Nosotros",
     cliente:usuario
    }
     res.render('Nosotros.html',valores)
 });
 
 router.post('/Nosotros',async(req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
     const valores={
         titulo:"Nosotros",
         cliente:usuario
        }
         res.render('Nosotros.html',valores)
 });


 router.get('/registro',(req,res)=>{
    const valores={
     titulo:"registro",
     encabezado:"Registrate"
    }
     res.render('registro.html',valores)
 });
 
 router.post('/registro',(req,res)=>{
     const valores={
         titulo:"registro",
         encabezado:"Registrate"
        }
         res.render('registro.html',valores)
 });



 router.get('/productosClic',async(req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
    const valores={
        titulo:"Mostrar producto",
        cliente:usuario

    }
     res.render('productosClic.html',valores)
 });
 
 router.post('/productosClic',async(req,res)=>{
    const usuario = await validarSesion(req.cookies.Sesion)
    const valores={
        titulo:"Mostrar producto",
        cliente:usuario
    }
    res.render('productosClic.html',valores)
});


export default router;