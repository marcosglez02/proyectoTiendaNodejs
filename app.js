import http from "http"
import express from "express";
import ejs from "ejs";
import bodyparser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cookieParser());
app.set("view engine","ejs");
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended:true}));


// Rutas
import adminCategorias from "./router/categorias.js"
import adminProductos from "./router/productos.js"
import productosVista from "./router/productosVista.js"
import autentificacion from "./router/autentificación.js"
import carrito from "./router/carrito.js"
import ruta from "./router/index.js"


app.use(adminCategorias);
app.use(ruta);
app.use(adminProductos);
app.use(productosVista);
app.use(autentificacion);
app.use(carrito)

app.use((req,res,next)=>{res.status(404).sendFile(__dirname+'/public/error.html')})
// Escuchar al servidor por el puerto 3001
const puerto = 3001;
app.listen(puerto,()=>{console.log("Iniciando puerto 3001")});