/*

    Ruta: /api/usuarios

*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios.controller');

const router = Router();


router.get('/', validarJWT, getUsuarios );

router.post('/', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contrasena es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos,

    ],
    crearUsuario
);

router.put('/:id', 
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarUsuario 
);

router.delete('/:id', 
    validarJWT,
    borrarUsuario
   
);
module.exports = router;
