const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario.model');
const res = require('express/lib/response');

const getUsuarios = async(req, res) =>{

    const usuarios = await Usuario.find({},'name email role google' );

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {

    //parametros que viene del Front
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta resgistrado'
            });
        }

        //Modelo
        const usuario = new Usuario (req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar el usuario
        await usuario.save();

        //Generar un token
        const token = await generarJWT( usuario.id)
    
        res.json({
            ok: true,
            usuario,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... revisar logs'
        });
        
    }

   

}


const actualizarUsuario = async (req, res = response) => {

    //TODO: Validar Token y comprobar si es el usuario correcto

    //extraigo el id de la url del front
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con es id'
            });

        }

        // Actualizaciones

        const {password,google,email,...campos} = req.body;

        if(usuarioDB.email !== email){

            const existeEmail = await Usuario.findOne({ email });

            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });

            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new:true} );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async(req, res= response)=> {

    //extraigo el id de la url del front
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con es id'
            });

        }

        await Usuario.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
        
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}