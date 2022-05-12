
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    
});

//configurando el ID que genera Mongoose
UsuarioSchema.method('toJSON', function(){
   const {__v, _id, password, ...Object} = this.toObject(); 
    Object.uid = _id;
    return Object;
});

module.exports = model('Usuario', UsuarioSchema );