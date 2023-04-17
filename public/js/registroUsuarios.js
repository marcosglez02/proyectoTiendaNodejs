const formularioRegistroCliente= document.querySelector("#formularioRegistroCliente")
const botonRegistroCliente = document.querySelector("#btnRegistroCliente")
formularioRegistroCliente.addEventListener("submit", async()=>{
    event.preventDefault();
    const usuario = formularioRegistroCliente['usuario'].value.trim()
    const nombreUsuario = formularioRegistroCliente['nombreUsuario'].value.trim()
    const apellidoUsuario = formularioRegistroCliente['apellidoUsuario'].value.trim()
    const domicilioUsuario = formularioRegistroCliente['domicilioUsuario'].value.trim()
    const telefonoUsuario = formularioRegistroCliente['telefonoUsuario'].value.trim()
    const correoUsuario = formularioRegistroCliente['correoUsuario'].value.trim()
    const contraseñaUsuario = formularioRegistroCliente['contraseñaUsuario'].value.trim()
    const contraConfirmar = formularioRegistroCliente['contraConfirmar'].value.trim()
    
    try{
    if(usuario=="" || nombreUsuario=="" || apellidoUsuario=="" || domicilioUsuario=="" || telefonoUsuario=="" || correoUsuario=="" || contraseñaUsuario=="" || contraConfirmar==""){
       return alert("Complete los campos")
    }
    
    
    let { data } = await axios.post('/registroUsuarios', {
        usuario: usuario,
        nombreUsuario: nombreUsuario,
        apellidoUsuario: apellidoUsuario,
        domicilioUsuario: domicilioUsuario,
        telefonoUsuario: telefonoUsuario,
        correoUsuario: correoUsuario,
        contraseñaUsuario: contraseñaUsuario,
        contraConfirmar: contraConfirmar
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    alert("Se ha registrado correctamente " + nombreUsuario)
    window.location.pathname = "/login"
    }catch(error){
        alert(error.response.data, "Error")
    }
})

function validar(){
    let contra = document.getElementById('contraseñaUsuario');
    let ccontra = document.getElementById('contraConfirmar');

    if(ccontra.value==contra.value){
        ccontra.style.border='3px solid green';
    }else{
        ccontra.style.border='3px solid red';
    }
    
};