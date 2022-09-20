const {Schema, model} = require('mongoose')

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true // para que de error si no se guarda.
    },
    usuario : {
        // obtiene el id
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio : {
        type: Number,
        default: 0
    },
    categoria : {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion : { type: String },
    disponible  : { type: Boolean, default: true }
});

// remueves datos a enviar cuando se solicite categoria
ProductoSchema.methods.toJSON = function(){
    const { __v, estado, disponible, ...data } = this.toObject();
    return data;
}


// el categoria de abajo, crea el name de la db
module.exports = model( 'Producto', ProductoSchema );