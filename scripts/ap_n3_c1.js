function validarFormulario() {
    let nombre = document.getElementById('inputNombre');
    let email = document.getElementById('inputEmail');
    let rut = document.getElementById('inputRut');
    let telefono = document.getElementById('inputTelefono');
    let contrasena = document.getElementById('inputContrasena');
    let repContrasena = document.getElementById('inputRepetirContrasena');
    let fechaNacimiento = document.getElementById('inputFechaNac');
    let genero = document.querySelector('input[name="radioGenero"]:checked');
    let pais = document.getElementById('selectPais');

    if (nombre.value == '') {
        nombre.classList.add('is-invalid', 'alerta');
    } else {
        nombre.classList.remove('is-invalid', 'alerta');
        nombre.classList.add('is-valid');
    }

    if (email.value == '' || !validarEmail(email.value)) {
        email.classList.add('is-invalid', 'alerta');
    } else {
        email.classList.remove('is-invalid', 'alerta');
        email.classList.add('is-valid');
    }

    if (rut.value == '') {
        rut.classList.add('is-invalid', 'alerta');
    } else {
        rut.classList.remove('is-invalid', 'alerta');
        rut.classList.add('is-valid');
    }

    if (telefono.value == '') {
        telefono.classList.add('is-invalid', 'alerta');
    } else {
        telefono.classList.remove('is-invalid', 'alerta');
        telefono.classList.add('is-valid');
    }

    if (contrasena.value == '') {
        contrasena.classList.add('is-invalid', 'alerta');
    } else {
        contrasena.classList.remove('is-invalid', 'alerta');
        contrasena.classList.add('is-valid');
    }

    if (repContrasena.value == '') {
        repContrasena.classList.add('is-invalid', 'alerta');
    } else {
        repContrasena.classList.remove('is-invalid', 'alerta');
        repContrasena.classList.add('is-valid');
    }

    if (fechaNacimiento.value == '') {
        fechaNacimiento.classList.add('is-invalid', 'alerta');
    } else {
        fechaNacimiento.classList.remove('is-invalid', 'alerta');
        fechaNacimiento.classList.add('is-valid');
    }

    if (pais.value == '') {
        pais.classList.add('is-invalid', 'alerta');
    } else {
        pais.classList.remove('is-invalid', 'alerta');
        pais.classList.add('is-valid');
    }
}

function validarEmail(email){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
};

function validarCongtrasena(contrasena){
    
}