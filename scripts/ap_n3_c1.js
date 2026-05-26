

window.onload = function () {
    let nombre = document.getElementById('inputNombre');
    console.log(nombre.value)
}

function validarFormulario(){
    let nombre = document.getElementById('inputNombre');
    let email = document.getElementById('inputEmail');
    let rut = document.getElementById('inputRut');
    let telefono = document.getElementById('inputTelefono');
    let contrasena = document.getElementById('inputContrasena');
    let repContrasena = document.getElementById('inputRepetirContrasena');
    let fechaNacimiento = document.getElementById('inputFechaNac');
    let genero = document.querySelector('input[name="radioGenero"]:checked');
    let pais = document.getElementById('selectPais');

    if(nombre.value == ''){
        nombre.classList.add('is-invalid');
    }else{}
}