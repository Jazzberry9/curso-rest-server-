
const dbvalidators = require('./db-validators'); 
const generarJWT   = require('./generar-jwt'); 
const googleVerify = require('./google-verify'); 
const subirArchivo = require('./subir-archivos'); 

module.exports = {
    ...dbvalidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo        
}
