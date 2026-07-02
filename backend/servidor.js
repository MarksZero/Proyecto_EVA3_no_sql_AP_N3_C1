// Importamos las librerías instaladas
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Iniciar la aplicación express
const aplicacion = express();
const puerto = 3000;

// Configuración de la aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Crear la conexión a DB
mongoose.connect('mongodb://localhost:27017/EVA3_NO_SQL')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse por el siguiente error: ', excepcion));

// =============================================================================================================
//                                      ESQUEMAS Y MODELOS
// =============================================================================================================

const comunaSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    region: String
});

const Comuna = mongoose.model('Comuna', comunaSchema, 'comunas');

const paisSchema = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});

const Pais = mongoose.model('Pais', paisSchema, 'paises');


const direccionSchema = new mongoose.Schema({
    comuna: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    departamento: String
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: String,
    fechaNacimiento: {
        type: Date,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        enum: ['M', 'F', 'O'],
        required: true
    },
    direccion: {
        type: direccionSchema,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

const cuentaBancariaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    banco: {
        type: String,
        required: true
    },
    tipoCuenta: {
        type: String,
        required: true
    },
    numeroCuenta: {
        type: String,
        required: true
    },
    moneda: {
        type: String,
        required: true,
        default: 'CLP'
    },
    saldo: {
        type: Number,
        required: true,
        default: 0
    },
    fechaApertura: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'Activa'
    },
    sucursal: String,
    titular: {
        type: String,
        required: true
    }
});

const CuentaBancaria = mongoose.model('CuentaBancaria', cuentaBancariaSchema, 'cuentas_bancarias');

// =============================================================================================================
//                                          MÉTODOS USUARIO
// =============================================================================================================

aplicacion.post('/guardarUsuario', async (request, response) => {
    try {
        const {
            nombre,
            rut,
            correo,
            email,
            telefono,
            fechaNacimiento,
            nacimiento,
            genero,
            nacionalidad,
            direccion,
            contrasena
        } = request.body;

        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            rut,
            correo: correo || email,
            telefono,
            fechaNacimiento: fechaNacimiento || nacimiento,
            genero,
            nacionalidad: nacionalidad || 'CL',
            direccion,
            contrasena: contrasenaEncriptada
        });

        await nuevoUsuario.save();

        response.status(200).json({
            mensaje: 'Usuario almacenado correctamente.',
            usuario: nuevoUsuario
        });

    } catch (excepcion) {
        response.status(500).json({
            mensaje: 'No se ha podido almacenar el usuario.',
            error: excepcion.message
        });
    }
});

aplicacion.get('/usuarios', async (request, response) => {
    try {
        const usuarios = await Usuario.find({}, { contrasena: 0 }).exec();

        if (!usuarios || usuarios.length === 0) {
            return response.status(404).json({
                mensaje: 'No se encontraron usuarios registrados.'
            });
        }

        response.status(200).json(usuarios);

    } catch (error) {
        response.status(500).json({
            mensaje: 'No ha sido posible obtener los usuarios.',
            error: error.message
        });
    }
});

// =============================================================================================================
//                                         MÉTODOS CUENTA BANCARIA
// =============================================================================================================

aplicacion.post('/guardarCuentaBancaria', async (request, response) => {
    try {
        const nuevaCuenta = new CuentaBancaria(request.body);

        await nuevaCuenta.save();

        response.status(200).json({
            mensaje: 'Cuenta bancaria almacenada correctamente.',
            cuenta: nuevaCuenta
        });

    } catch (excepcion) {
        response.status(500).json({
            mensaje: 'No se ha podido almacenar la cuenta bancaria.',
            error: excepcion.message
        });
    }
});

aplicacion.get('/cuentasBancarias', async (request, response) => {
    try {
        const cuentas = await CuentaBancaria.find().exec();

        if (!cuentas || cuentas.length === 0) {
            return response.status(404).json({
                mensaje: 'No se encontraron cuentas bancarias registradas.'
            });
        }

        response.status(200).json(cuentas);

    } catch (error) {
        response.status(500).json({
            mensaje: 'No ha sido posible obtener las cuentas bancarias.',
            error: error.message
        });
    }
});

// Consulta avanzada con $lookup
aplicacion.get('/usuariosConCuentasBancarias', async (request, response) => {
    try {
        const resultado = await Usuario.aggregate([
            {
                $lookup: {
                    from: 'cuentas_bancarias',
                    localField: '_id',
                    foreignField: 'usuario',
                    as: 'cuentasBancarias'
                }
            },
            {
                $project: {
                    contrasena: 0
                }
            }
        ]);

        response.status(200).json(resultado);

    } catch (error) {
        response.status(500).json({
            mensaje: 'No ha sido posible obtener la información.',
            error: error.message
        });
    }
});

// =============================================================================================================
//                                          MÉTODOS PAÍSES Y COMUNAS
// =============================================================================================================

aplicacion.get('/paises', async (request, response) => {
    try {
        const paises = await Pais.find().exec();

        if (!paises || paises.length === 0) {
            return response.status(404).json({
                mensaje: 'No se encontraron países registrados.'
            });
        }

        response.status(200).json(paises);

    } catch (error) {
        response.status(500).json({
            mensaje: 'No ha sido posible obtener los países.',
            error: error.message
        });
    }
});

aplicacion.get('/comunas', async (request, response) => {
    try {
        const comunas = await Comuna.find().exec();

        if (!comunas || comunas.length === 0) {
            return response.status(404).json({
                mensaje: 'No se encontraron comunas registradas.'
            });
        }

        response.status(200).json(comunas);

    } catch (error) {
        response.status(500).json({
            mensaje: 'No ha sido posible obtener las comunas.',
            error: error.message
        });
    }
});

// Iniciar servidor
aplicacion.listen(puerto, () => console.log(`Corriendo en el puerto ${puerto}`));