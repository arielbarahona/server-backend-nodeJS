const bcrypt = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.model');


const login = async( req, res = response ) => {

    //Extraer campos de front
    const {email, password} = req.body;



    try {

        //verifica Email

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });

        }
        //verificar contrasena
        const validPasword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPasword){
            return res.status(400).json({
                ok:false,
                msg: 'Contrasena no valida'
            });

        }

        //Generar un token
        const token = await generarJWT( usuarioDB.id)


        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'hable con el administrador'
        });
    }


}

module.exports = {
    login
}