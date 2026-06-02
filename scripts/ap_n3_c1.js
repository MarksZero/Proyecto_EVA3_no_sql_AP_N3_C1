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
    let formularioValido = true;

    if (!validarCampo(nombre)) {
        formularioValido = false;
    }

    if (!validarCampo(email) || !validarEmail(email.value)) {
        formularioValido = false;
    }

    if (!validarCampo(rut) || !validarRut(rut)) {
        formularioValido = false;
    }

    if (!validarCampo(telefono)) {
        formularioValido = false
    }

    if (!validarCampo(contrasena) || !validarContrasena(contrasena.value)) {
        formularioValido = false
    }

    if (!validarCampo(repContrasena) || repContrasena.value != contrasena.value) {
        formularioValido = false
    }

    if (!validarCampo(fechaNacimiento)) {
        formularioValido = false
    }

    if (!validarCampo(pais)) {
        formularioValido = false
    }

    if(validarFormulario != false){
        alert('Datos ingresados correctamente, enviado al servidor...')
    }
}

function validarCampo(campo){
    if (campo.value == '') {
        campo.classList.add('is-invalid', 'alerta');
        return false
    } else {
        campo.classList.remove('is-invalid', 'alerta');
        campo.classList.add('is-valid');
        return true
    }
}

function validarEmail(email){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
};

function validarContrasena(contrasena){
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return regexContrasena.test(contrasena);
}

function validarRut(rut) {
    var valor = rut.value.replace('.','');
    valor = valor.replace('-','');
    
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    rut.value = cuerpo + '-'+ dv
    
    if(cuerpo.length < 7) { return false;}
    suma = 0;
    multiplo = 2;
    
    for(i=1;i<=cuerpo.length;i++) {
        index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;        
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }  
    }
    
    dvEsperado = 11 - (suma % 11);

    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;

    if(dvEsperado != dv) { return false; }
    return true;
}