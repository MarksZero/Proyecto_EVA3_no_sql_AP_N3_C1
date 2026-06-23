window.onload = function () {
    obtenerPaises();
};

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

    if (!validarEmail(email)) {
        formularioValido = false;
    }

    if (!validarRut(rut)) {
        formularioValido = false;
    }

    if (!validarCampo(telefono)) {
        formularioValido = false
    }

    if (!validarContrasena(contrasena)) {
        formularioValido = false
    }

    if (!validarRepetirContrasena(repContrasena, contrasena)) {
        formularioValido = false
    }

    if (!validarCampo(fechaNacimiento)) {
        formularioValido = false
    }

    if (!validarCampo(pais)) {
        formularioValido = false
    }

    if (formularioValido) {
        alert('Datos ingresados correctamente, enviado al servidor...');

        const formulario = document.getElementById('registroUsuario');
        const datosFormulario = new FormData(formulario);
        const data = Object.fromEntries(datosFormulario.entries());

        const enviarDatos = async () => {
            try {
                const respuesta = await fetch('http://localhost:3000/guardarUsuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const info = await respuesta.json();
                console.log('Datos correctamente almacenados: ', info);
                if (respuesta.ok) {
                    formulario.reset();
                    window.location.href = './inicio.html';
                }
            }
            catch (error) {
                console.log('Error al guardar los datos: ', error);
            }
        }
        enviarDatos();
    } else {
        alert('Complete todos los datos antes de enviar el formulario.')
    }
}

function validarCampo(campo) {
    if (campo.value == '') {
        campo.classList.add('is-invalid', 'alerta');
        return false
    } else {
        campo.classList.remove('is-invalid', 'alerta');
        campo.classList.add('is-valid');
        return true
    }
}

function validarEmail(campo) {
    if (validarCampo(campo)) {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regexEmail.test(campo.value)) {
            campo.classList.add('is-invalid', 'alerta');
            return false
        } else {
            campo.classList.remove('is-invalid', 'alerta');
            campo.classList.add('is-valid');
            return true
        }
    }
};

function validarContrasena(campo) {
    if (validarCampo(campo)) {
        const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (regexContrasena.test(campo.value)) {
            campo.classList.remove('is-invalid', 'alerta');
            campo.classList.add('is-valid');
            return true
        } else {
            campo.classList.add('is-invalid', 'alerta');
            return false
        }
    }
}

function validarRepetirContrasena(campo, campo2) {
    if (validarCampo(campo)) {
        if (campo.value === campo2.value) {
            campo.classList.remove('is-invalid', 'alerta');
            campo.classList.add('is-valid');
            return true
        } else { campo.classList.add('is-invalid', 'alerta'); return false }
    }
}

function validarRut(campo) {
    if (validarCampo(campo)) {
        var valor = campo.value.replace('.', '');
        valor = valor.replace('-', '');

        cuerpo = valor.slice(0, -1);
        dv = valor.slice(-1).toUpperCase();
        campo.value = cuerpo + '-' + dv

        if (cuerpo.length < 7) { return false; }
        suma = 0;
        multiplo = 2;

        for (i = 1; i <= cuerpo.length; i++) {
            index = multiplo * valor.charAt(cuerpo.length - i);
            suma = suma + index;
            if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
        }

        dvEsperado = 11 - (suma % 11);

        dv = (dv == 'K') ? 10 : dv;
        dv = (dv == 0) ? 11 : dv;

        if (dvEsperado == dv) {
            campo.classList.remove('is-invalid', 'alerta');
            campo.classList.add('is-valid');
            return true
        } else {
            campo.classList.add('is-invalid', 'alerta');
            return false
        }
    }
};

async function obtenerPaises() {
    try {
        const respuesta = await fetch('http://localhost:3000/listadoPaises');
        const paises = await respuesta.json();

        const selectPaises = document.getElementById('selectPais');
        console.log(paises)
        Object.entries(paises).forEach(([key, pais]) => {
            const opcion = document.createElement('option');
            opcion.value = pais.iso2;
            opcion.textContent = pais.nacionalidad;
            selectPaises.appendChild(opcion);
        });
    } catch (error) {
        console.log('Error: ', error);
    }
};