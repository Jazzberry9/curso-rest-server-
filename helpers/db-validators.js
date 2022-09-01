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

module.exports = {
    esRolValido,
    emailExiste,
    comprobarUsuarioId
}