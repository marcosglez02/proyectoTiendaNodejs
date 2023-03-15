const http = require("http");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const misRutas = require("./router/index");
const path = require("path");

app.set("view engine","ejs");
app.engine('html',require('ejs').renderFile);
app.use(express.static(__dirname+'/public'))
app.use(bodyparser.urlencoded({extended:true}));5
app.use(misRutas)

app.use((req,res,next)=>{res.status(404).sendFile(__dirname+'/public/error.html')})
// Escuchar al servidor por el puerto 3001
const puerto = 3001;
app.listen(puerto,()=>{console.log("Iniciando puerto 3001")});