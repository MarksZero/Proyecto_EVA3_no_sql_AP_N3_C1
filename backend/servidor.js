// Importamos las librerías instaladas
const express = require('express'); // Express permite generar la aplicación backend
const cors = require('cors'); // Cors permite que el servidor reciba solicitudes externas
const mongoose = require('mongoose'); // ORM que permite trabajar con objetos y DBs
const bcrypt = require('bcrypt');

// Iniciar la aplicación express
const aplicacion = express();
const puerto = 3000;

// Instanciar las clases necesarias en nuestra aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Crear la conexión a DB
mongoose.connect('mongodb://localhost:27017/AP_N3_C1')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse por el siguiente error: ', excepcion));

const port = process.env.port || 3000;
aplicacion.listen(puerto, () => console.log(`Corriendo en el puerto ${port}`))

// Crear el MODELO de datos
const usuario = new mongoose.Schema({
    nombre: String,
    email: String,
    rut: String,
    telefono: String,
    contrasena: String,
    nacimiento: Date,
    genero: String,
    nacionalidad: String
});

const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});

// Crear un OBJETO en base al MODELO
const Usuario = mongoose.model('Usuario', usuario, 'usuarios');
const Pais = mongoose.model('Pais', pais, 'paises');

// Crear el método para CREAR esos objetos en DB
aplicacion.post('/guardarUsuario', async (request, response) => {
    try {
        const { nombre, email, rut, telefono, contrasena, nacimiento, genero, nacionalidad } = request.body;
        const saltRounds = 10;
        const contrasenaEncriptada = await bcrypt.hash(contrasena, saltRounds);
        const nuevoUsuario = new Usuario({ nombre, email, rut, telefono, contrasena: contrasenaEncriptada, nacimiento, genero, nacionalidad });

        await nuevoUsuario.save();
        response.status(200).json({ mensaje: 'Datos almacenados correctamente.' });
    } catch (excepcion) {
        response.status(500).json({ mensaje: 'No se han podido almacenar los datos: ', excepcion });
    }
});

// Crear método para obtener objetos desde la DB
aplicacion.get('/listadoUsuarios'

);

aplicacion.get('/listadoPaises', async (request, response) => {
    try {
        const paises = await Pais.find().exec();
        if (!paises || paises.length === 0) {
            return response.status(404).json({ mensaje: 'No se encontraron países registrados.' });
        }

        response.status(200).json(paises);
    } catch (error) {
        response.status(500).json({ mensaje: 'No ha sido posible obtener los datos: ', error })
    }
});