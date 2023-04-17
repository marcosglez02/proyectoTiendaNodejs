
const formulario= document.querySelector("#formularioCategoria")
const boton = document.querySelector("#Boton")
formulario.addEventListener("submit", async()=>{
    event.preventDefault();
    const nombreCategoria = formulario['nombreCategoria'].value.trim()

    try{
    if(nombreCategoria=="" || nombreCategoria==undefined){
       return alert("La categoria esta vacia")
    }
    if(nombreCategoria>10){
        return alert("mucho texto")
    }
   
    
    let { data } = await axios.post('/insertar', {
        nombreCategoria: nombreCategoria
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    alert("Listo" )
    window.location.reload()
    }catch(error){
        alert(error.response.data, "Error")
    }
})