const formularioCliente= document.querySelector("#formularioLoginUsuario")
const botonCliente = document.querySelector("#btnInicioSesionUsuario")
formularioCliente.addEventListener("submit", async()=>{
    event.preventDefault();
    const usuarioCliente = formularioCliente['usuario'].value.trim()
    const contraseñaCliente = formularioCliente['contraseña'].value.trim()
    
    try{
    if(usuarioCliente=="" || usuarioCliente==undefined){
       return alert("El usuario no puede estar vacío")
    }
    if(contraseñaCliente=="" || contraseñaCliente==undefined){
        return alert("La contraseña no puede estar vacía")
     }
    
    let { data } = await axios.post('/usuario/iniciarSesion', {
        usuario: usuarioCliente,
        contraseña: contraseñaCliente
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    alert("Bienvenido " + usuarioCliente)
    window.location.pathname = "/"
    }catch(error){
        alert(error.response.data, "Error")
    }
})