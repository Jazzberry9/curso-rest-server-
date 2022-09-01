

const { Schema, model } = require('mongoose');

// objeto literal
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'], 
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatorio']
    },
    img: {
        type: String, // En string pq se llama una url
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // Que es un usuario o el otro
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function(){
    const { __v,password, ...datosUsuarios } = this.toObject();
    return datosUsuarios;
}

module.exports = model('Usuario', UsuarioSchema) // El Usuarios le da el nombre a la collection