//variables de entorno
require('dotenv').config();

//utilizar express
const express = require('express');

//importar las cors
const cors = require('cors');

//Conexion a BD
const {dbConnection} = require('./database/config');

//crear el servidor de express 
const app = express();

//Configurar CORS
app.use(cors());

//Conexion entre mongo y ATLAS BASE DE DATOS
dbConnection();

//Rutas
app.get('/', (req, res) =>{

    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

//Escucha del server
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' +  process.env.PORT);
})