const formulario= document.querySelector("#formularioInsertarProductos")
const boton = document.querySelector("#Boton")
formulario.addEventListener("submit", async()=>{
    event.preventDefault();
    const precio = formulario['precio'].value.trim()
    const nombreProducto = formulario['nombreProducto'].value.trim()
    const cantidad = formulario['cantidad'].value.trim()
    const descripcion = formulario['descripcion'].value.trim()
    const idCategoria = formulario['idCategoria'].value.trim()
    const img = formulario['img'].value
    
    
    try{
    if(precio=="" || precio==undefined){
       return alert("El precio no puede estar vacío")
    }
    if(nombreProducto=="" || nombreProducto==undefined){
        return alert("El nombre no puede estar vacía")
     }
     if(cantidad=="" || cantidad==undefined){
        return alert("La cantidad no puede estar vacía")
     }
     if(descripcion=="" || descripcion==undefined){
        return alert("La descripcion no puede estar vacía")
     }
     if(idCategoria=="" || idCategoria==undefined){
        return alert("La categoria no puede estar vacía")
     }
     if(img=="" || img==undefined){
        return alert("La imagen no puede estar vacía")
     }
     if(descripcion>15){
        return alert("mucho texto")
     }
    
    let { data } = await axios.post('/insertarProducto', {
        precio: precio,
        nombreProducto:nombreProducto,
        cantidad:cantidad,
        descripcion:descripcion,
        idCategoria:idCategoria,
        

    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    alert("listo" )
    window.location.pathname = "/admin/productos"
    }catch(error){
        alert(error.response.data, "Error")
    }
})