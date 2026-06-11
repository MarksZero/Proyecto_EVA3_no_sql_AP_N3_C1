// Importamos las librerías instaladas
const express = require('express'); // Express permite generar la aplicación backend
const cors = require('cors'); // Cors permite que el servidor reciba solicitudes externas
const mongoose = require('mongoose'); // ORM que permite trabajar con objetos y DBs

// Iniciar la aplicación express
const aplicacion = express();
const puerto = 3000;

// Instanciar las clases necesarias en nuestra aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Crear la conexión a DB
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse por el siguiente error: ', excepcion));

// Crear el MODELO de datos
const usuario = new mongoose.Schema({
    nombre: String,
    email: String,
    rut: String,
    telefono: String,
    contrasena: String,
    nacimiento: String,
    genero: String,
    nacionalidad: String
});

// Crear un OBJETO en base al MODELO
const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

// Crear el método para CREAR esos objetos en DB
aplicacion.post('/guardarUsuario', async (req, res) => {
    try {
        const { nombre, email, rut, telefono, contrasena, nacimiento, genero, nacionalidad } = req.body;
        const nuevoUsuario = new Usuario({nombre, email, rut, telefono, contrasena, nacimiento, genero, nacionalidad});

        await nuevoUsuario.save();
        res.status(200).json({mensaje:'Datos almacenados correctamente.'});
    } catch (excepcion) {
        res.status(500).json({ mensaje: 'No se han podido almacenar los datos: ', excepcion });
    }
});