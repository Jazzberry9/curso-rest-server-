const { response } = require("express");

    // validar que venga un file
const validarSubirArchivo =  ( req, res = response, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        res.status(400).json({
            msg: 'No files were uploaded. -- From Middleware'
        });
        return;
    }
    next();
}

module.exports = {
    validarSubirArchivo
}



