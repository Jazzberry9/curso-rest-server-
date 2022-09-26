const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadArchivo = ( files, extensionesDeseadas = [ 'jpg', 'png', 'jpeg', 'gif', 'PNG' ], carpeta = '' ) => {

    return new Promise (( resolve, reject) => {

        // validar nombre archivo
        const { archivo } = files;
        const haciendoSplit = archivo.name.split('.');
        const final = haciendoSplit[ haciendoSplit.length - 1 ];

        // validar extension
        if ( !extensionesDeseadas.includes(final)){
            return reject(`La extension ${final} no es valida. Usar ${extensionesDeseadas}`);
        }
        // generar nombre
        const nombreTempFile = uuidv4() + '.' + final;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTempFile);

        // mover al sitio de descarga
        archivo.mv(uploadPath, (err) => {
        if (err) {
            reject( err );
        }

        resolve( nombreTempFile )
        });    

    })
}


module.exports = {
    uploadArchivo
}

