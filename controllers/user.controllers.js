const { response } = require('express');


const userControllersGet = (req, res = response ) => {
    // extraer params
    const {q, nombre = "no name", apikey, page = 1, limit } = req.query

    res.status(200).json({
        msg: 'get API - From user controllers'
    });
}
const userControllersPost = (req, res = response ) => {
    
    const {name, age } = req.body; // saca la informacion que mande el usuario del body

    res.status(200).json({
        msg: 'Post API - From user controllers',
        name,
        age
        
    });
}
const userControllersPut = (req, res = response ) => {

    // con params es de express, es una propiedad del objeto request para usar id
    // id porque fue el nombre que colocamos en las rutas
    // si hay mas como id, se usa desestructurazion
    // asi const { id } = req.params;
    const id = req.params.id

    res.json({
        msg: 'Put API - From user controllers',
        id
    });
}
const userControllersPatch = (req, res = response ) => {
    res.status(200).json({
        msg: 'Patch API - From user controllers'
    });
}
const userControllersDelete = (req, res = response ) => {
    res.status(200).json({
        msg: 'Delete API - From user controllers'
    });
}

module.exports = {
    userControllersGet,
    userControllersPost,
    userControllersPut,
    userControllersPatch,
    userControllersDelete,
}