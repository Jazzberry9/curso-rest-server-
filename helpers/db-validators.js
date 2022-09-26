const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario'); // U mayuscula para poder crear instancia del modelo


const esRolValido = async(rol ='') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error( `El rol ${rol} no esta registrado en la base de datos` );
    }
}

const emailExiste = async(correo = '') =>{
    const mailExist = await Usuario.findOne({correo})
    if (mailExist){
        throw new Error( `Ya existe ${correo} en la base de datos, elija otro` );
    }
    return correo;
}

const comprobarUsuarioId = async( id ) =>{
    const usuarioID = await Usuario.findById(id)
    if (!usuarioID){
        throw new Error( `La id: ${id} no existe en la base de datos` );
    }
}
const comprobarCategoriaId = async( id ) =>{
    const categoriaId = await Categoria.findById(id)
    if (!categoriaId){
        throw new Error( `La categoria no existe en la base de datos` );
    }
}
const comprobarProductoId = async( id ) =>{
    const productoId = await Producto.findById(id)
    if (!productoId){
        throw new Error( `El producto no existe en la base de datos` );
    }
}
const allowedCollections = (coleccion = '', colecciones = []) => {

    const checkCollection = colecciones.includes( coleccion );

    if( !checkCollection ){
        throw new Error (`La coleccion ${coleccion} no esta permitida --- ${colecciones}`)
    }
    // en todas deberia tener el return true btw.
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    comprobarUsuarioId,
    comprobarCategoriaId,
    comprobarProductoId,
    allowedCollections
}