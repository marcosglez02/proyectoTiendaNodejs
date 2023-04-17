
const formulario= document.querySelector("#formularioLogin")
const boton = document.querySelector("#btnInicioSesion")
formulario.addEventListener("submit", async()=>{
    event.preventDefault();
    const usuario = formulario['txtUsuario'].value.trim()
    const contraseña = formulario['txtPassword'].value.trim()
    
    try{
    if(usuario=="" || usuario==undefined){
       return alert("El usuario no puede estar vacío")
    }
    if(contraseña=="" || contraseña==undefined){
        return alert("La contraseña no puede estar vacía")
     }
    
    let { data } = await axios.post('/admin/login/', {
        usuario: usuario,
        contraseña: contraseña
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    alert("Bienvenido " + usuario)
    window.location.pathname = "/admin/productos"
    }catch(error){
        alert(error.response.data, "Error")
    }
})