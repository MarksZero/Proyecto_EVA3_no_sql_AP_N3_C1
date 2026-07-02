window.onload = function () {
    if (document.getElementById('example')) {
        new DataTable('#example');
    }

    if (document.getElementById('selectPais')) {
        obtenerPaises();
    }

    if (document.getElementById('selectComuna')) {
        obtenerComunas();
    }

    if (document.getElementById('cuerpoTablaCuentas')) {
        obtenerUsuariosConCuentasBancarias();
    }

    if (document.getElementById('selectUsuario')) {
        obtenerUsuariosParaSelect();
    }
};

function validarFormulario() {
    let nombre = document.getElementById('inputNombre');
    let email = document.getElementById('inputEmail');
    let rut = document.getElementById('inputRut');
    let telefono = document.getElementById('inputTelefono');
    let contrasena = document.getElementById('inputContrasena');
    let repContrasena = document.getElementById('inputRepetirContrasena');
    let fechaNacimiento = document.getElementById('inputFechaNac');
    let genero = document.getElementById('selectGenero');
    let pais = document.getElementById('selectPais');
    let comuna = document.getElementById('selectComuna');
    let calle = document.getElementById('inputCalle');
    let numero = document.getElementById('inputNumero');
    let departamento = document.getElementById('inputDepartamento');

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
        formularioValido = false;
    }

    if (!validarContrasena(contrasena)) {
        formularioValido = false;
    }

    if (!validarRepetirContrasena(repContrasena, contrasena)) {
        formularioValido = false;
    }

    if (!validarCampo(fechaNacimiento)) {
        formularioValido = false;
    }

    if (!validarCampo(genero)) {
        formularioValido = false;
    }

    if (!validarCampo(pais)) {
        formularioValido = false;
    }

    if (!validarCampo(comuna)) {
        formularioValido = false;
    }

    if (!validarCampo(calle)) {
        formularioValido = false;
    }

    if (!validarCampo(numero)) {
        formularioValido = false;
    }

    if (formularioValido) {
        const data = {
            nombre: nombre.value,
            rut: rut.value,
            correo: email.value,
            telefono: telefono.value,
            fechaNacimiento: fechaNacimiento.value,
            nacionalidad: pais.value,
            genero: genero.value,
            direccion: {
                comuna: comuna.value,
                calle: calle.value,
                numero: numero.value,
                departamento: departamento.value
            },
            contrasena: contrasena.value
        };

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
                console.log('Respuesta del servidor: ', info);

                if (!respuesta.ok) {
                    alert(info.mensaje || 'No se pudo guardar el usuario.');
                    return;
                }

                alert('Datos almacenados correctamente.');
                document.getElementById('registroUsuario').reset();
                window.location.href = './inicio.html';

            } catch (error) {
                console.log('Error al guardar los datos: ', error);
                alert('Error de conexión con el servidor.');
            }
        };

        enviarDatos();

    } else {
        alert('Complete todos los datos antes de enviar el formulario.');
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
        const respuesta = await fetch('http://localhost:3000/paises');
        const paises = await respuesta.json();

        const selectPaises = document.getElementById('selectPais');
        Object.entries(paises).forEach(([key, pais]) => {
            const opcion = document.createElement('option');
            opcion.value = pais.iso2;
            opcion.textContent = pais.nombre;
            selectPaises.appendChild(opcion);
        });
    } catch (error) {
        console.log('Error: ', error);
    }
};

async function obtenerComunas() {
    try {
        const respuesta = await fetch('http://localhost:3000/comunas');
        const comunas = await respuesta.json();

        const selectComunas = document.getElementById('selectComuna');

        Object.entries(comunas).forEach(([key, comuna]) => {
            const opcion = document.createElement('option');
            opcion.value = comuna.nombre;
            opcion.textContent = comuna.nombre;
            selectComunas.appendChild(opcion);
        });

    } catch (error) {
        console.log('Error: ', error);
    }
};

async function obtenerUsuariosConCuentasBancarias() {
    try {
        const respuesta = await fetch('http://localhost:3000/usuariosConCuentasBancarias');
        const usuarios = await respuesta.json();

        const cuerpoTabla = document.getElementById('cuerpoTablaCuentas');

        if (!cuerpoTabla) {
            return;
        }

        cuerpoTabla.innerHTML = '';

        usuarios.forEach(usuario => {
            if (usuario.cuentasBancarias.length === 0) {
                const fila = document.createElement('tr');

                fila.innerHTML = `
                    <td>${usuario.nombre}</td>
                    <td>${usuario.rut}</td>
                    <td>${usuario.correo}</td>
                    <td colspan="8">Usuario sin cuentas bancarias registradas</td>
                `;

                cuerpoTabla.appendChild(fila);
            } else {
                usuario.cuentasBancarias.forEach(cuenta => {
                    const fila = document.createElement('tr');

                    fila.innerHTML = `
                        <td>${usuario.nombre}</td>
                        <td>${usuario.rut}</td>
                        <td>${usuario.correo}</td>
                        <td>${cuenta.banco}</td>
                        <td>${cuenta.tipoCuenta}</td>
                        <td>${cuenta.numeroCuenta}</td>
                        <td>${cuenta.moneda}</td>
                        <td>${cuenta.saldo}</td>
                        <td>${cuenta.estado}</td>
                        <td>${cuenta.sucursal}</td>
                        <td>${cuenta.titular}</td>
                    `;

                    cuerpoTabla.appendChild(fila);
                });
            }
        });

    } catch (error) {
        console.log('Error al obtener usuarios con cuentas bancarias: ', error);
    }
}

async function obtenerUsuariosParaSelect() {
    try {
        const respuesta = await fetch('http://localhost:3000/usuarios');
        const usuarios = await respuesta.json();

        const selectUsuario = document.getElementById('selectUsuario');

        if (!selectUsuario) {
            return;
        }

        usuarios.forEach(usuario => {
            const opcion = document.createElement('option');
            opcion.value = usuario._id;
            opcion.textContent = `${usuario.nombre} - ${usuario.rut}`;
            selectUsuario.appendChild(opcion);
        });

    } catch (error) {
        console.log('Error al obtener usuarios: ', error);
    }
}

async function guardarCuentaBancaria() {
    const usuario = document.getElementById('selectUsuario');
    const banco = document.getElementById('inputBanco');
    const tipoCuenta = document.getElementById('selectTipoCuenta');
    const numeroCuenta = document.getElementById('inputNumeroCuenta');
    const moneda = document.getElementById('inputMoneda');
    const saldo = document.getElementById('inputSaldo');
    const fechaApertura = document.getElementById('inputFechaApertura');
    const estado = document.getElementById('selectEstado');
    const sucursal = document.getElementById('inputSucursal');
    const titular = document.getElementById('inputTitular');

    if (
        usuario.value === '' ||
        banco.value === '' ||
        tipoCuenta.value === '' ||
        numeroCuenta.value === '' ||
        moneda.value === '' ||
        saldo.value === '' ||
        fechaApertura.value === '' ||
        estado.value === '' ||
        titular.value === ''
    ) {
        alert('Complete todos los datos obligatorios.');
        return;
    }

    const data = {
        usuario: usuario.value,
        banco: banco.value,
        tipoCuenta: tipoCuenta.value,
        numeroCuenta: numeroCuenta.value,
        moneda: moneda.value,
        saldo: Number(saldo.value),
        fechaApertura: fechaApertura.value,
        estado: estado.value,
        sucursal: sucursal.value,
        titular: titular.value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/guardarCuentaBancaria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const info = await respuesta.json();
        console.log('Respuesta del servidor: ', info);

        if (!respuesta.ok) {
            alert(info.mensaje || 'No se pudo guardar la cuenta bancaria.');
            return;
        }

        alert('Cuenta bancaria registrada correctamente.');
        document.getElementById('registroCuentaBancaria').reset();
        window.location.href = './cuentas_bancarias.html';

    } catch (error) {
        console.log('Error al guardar la cuenta bancaria: ', error);
        alert('Error de conexión con el servidor.');
    }
}