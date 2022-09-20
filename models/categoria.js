const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema({
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
    }
});

// remueves datos a enviar cuando se solicite categoria
CategoriaSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}


// el categoria de abajo, crea el name de la db
module.exports = model( 'Categoria', CategoriaSchema );