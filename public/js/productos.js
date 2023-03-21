const imagenChange = () => {
    document.querySelector("#imagenSeleccionada").src = URL.createObjectURL(document.querySelector("#img").files[0]);
    document.querySelector("#imagenSeleccionada").classList.remove("d-none");
};

document.querySelector("#img").addEventListener("change",imagenChange);