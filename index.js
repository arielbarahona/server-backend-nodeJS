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

//lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Conexion entre mongo y ATLAS BASE DE DATOS
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));


//Escucha del server
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' +  process.env.PORT);
});