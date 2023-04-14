function alerta(message, title) {
	const modalToggle = document.getElementById("alertModal");
	const myModal = new bootstrap.Modal("#alertModal", { keyboard: false });
	document.getElementById("alertTitle").innerHTML = title;
	document.getElementById("alertMessage").innerHTML = message;
	myModal.show(modalToggle);
}

const formulario= document.querySelector("#formularioLogin")
const boton = document.querySelector("#btnInicioSesion")
formulario.addEventListener("submit", async()=>{
    
    const usuario = formulario['usuario'].value.trim()
    const contraseña = formulario['txtPassword'].value.trim()
    console.log(usuario +" " + contraseña)
    try{

    
    let { resultado } = await axios.post('/admin/productos', {
        usuario: usuario,
        contraseña: contraseña
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    alerta(resultado.message, "Mensaje");
    }catch(error){
        alert(error.response.data, "Error")
    }
})