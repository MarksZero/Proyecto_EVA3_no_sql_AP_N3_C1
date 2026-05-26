

window.onload = function () {
    let nombre = document.getElementById('inputNombre');
    console.log(nombre.value)
}

function validarFormulario(){
    let nombre = document.getElementById('inputNombre');
    let email = document.getElementById('inputEmail');
    console.log(nombre.value + '\n' + email.value)
}