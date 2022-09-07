const { response } = require('express');
const encriptar = require('bcryptjs');
const Usuario = require('../models/usuario'); // U mayuscula para poder crear instancia del modelo


const userControllersGet = async (req, res = response ) => {
    
    const { limite = 5, desde = 0} = req.query;
    const checkEstado = { estado : true };
    
    const [ total, users ] = await Promise.all([
        Usuario.countDocuments(checkEstado),
        Usuario.find(checkEstado)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({total, users});
}
const userControllersPost = async (req, res = response ) => {
    
    const { nombre, password, correo, rol} = req.body; // saca la informacion que mande el usuario del body
    const usuario = new Usuario({nombre, password,correo, rol});

    // Verificar si el corrreo existe
    
    // Encriptar contrasena // Hacer el hash
    const salt = encriptar.genSaltSync();
    usuario.password = encriptar.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();
    
    res.json({
        usuario,
    });
}
const userControllersPut = async (req, res = response ) => {

    // con params es de express, es una propiedad del objeto request para usar id
    const { id } = req.params;
    // Desestructurar lo que viene del req body, guardamos aca lo que no necesitamos
    const { _id, password, google, correo, ...resto } = req.body;

    // TO DO, validar contra base de datos
    if (password){
        const salt = encriptar.genSaltSync();
        resto.password = encriptar.hashSync(password, salt);
    }

    const updatedUser = await Usuario.findByIdAndUpdate( id, resto);

    res.json(updatedUser);
}

const userControllersPatch = (req, res = response ) => {
    res.status(200).json({
        msg: 'Patch API - From user controllers'
    });
}

const userControllersDelete = async (req, res = response ) => {

    const { id } = req.params;
    // Se puede borrar fisicamente, que no es recomendado
    // const deletingUser = await Usuario.findByIdAndDelete(id);

    // Se hace asi para "eliminar"
    const hideUser = await Usuario.findByIdAndUpdate( id, { estado: false } )
    // const usuarioAutenticado = req.userx; // el mismo userx de validarjwt

    res.json({
        hideUser, 
        // usuarioAutenticado
    });
}

module.exports = {
    userControllersGet,
    userControllersPost,
    userControllersPut,
    userControllersPatch,
    userControllersDelete,
}