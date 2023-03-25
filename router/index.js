import { Router } from "express";
const router = Router();

router.get('/',(req,res)=>{
    const valores={
        titulo:"Inicio"
       }
        res.render('index.html',valores)
});


router.get('/',(req,res)=>{
    const valores={
        titulo:"Inicio"
       }
        res.render('index.html',valores)
});


router.get('/admin/promociones',(req,res)=>{
    const valores={
        titulo:"Promociones"
       }
        res.render('admin/promociones.html',valores)
});
router.get('/admin/ventas',(req,res)=>{
    const valores={
        titulo:"Ventas"
       }
        res.render('admin/ventas.html',valores)
});

router.get('/carrito',(req,res)=>{
   const valores={
    titulo:"Carrito"
   }
    res.render('carrito.html',valores)
});

router.post('/carrito',(req,res)=>{
    const valores={
        titulo:"Carrito"
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


 router.get('/Contactos',(req,res)=>{
    const valores={
     titulo:"Contactos"
    }
     res.render('contactos.html',valores)
 });
 
 router.post('/Contactos',(req,res)=>{
     const valores={
         titulo:"Contactos"
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




 router.get('/Nosotros',(req,res)=>{
    const valores={
     titulo:"Nosotros"
    }
     res.render('Nosotros.html',valores)
 });
 
 router.post('/Nosotros',(req,res)=>{
     const valores={
         titulo:"Nosotros"
        }
         res.render('Nosotros.html',valores)
 });


 router.get('/pago',(req,res)=>{
    const valores={
     titulo:"pago"
    }
     res.render('pago.html',valores)
 });
 
 router.post('/pago',(req,res)=>{
     const valores={
         titulo:"pago"
        }
         res.render('pago.html',valores)
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


 router.get('/recu',(req,res)=>{
    const valores={
     titulo:"recu",
     encabezado:"Recuperar contraseña"
    }
     res.render('recu.html',valores)
 });
 
 router.post('/recu',(req,res)=>{
     const valores={
         titulo:"recu",
         encabezado:"recu"
        }
         res.render('recu.html',valores)
 });
export default router;