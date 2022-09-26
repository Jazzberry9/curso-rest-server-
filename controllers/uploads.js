const  path  = require("path");
const  fs  = require("fs");

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL )

const { response } = require("express");
const { uploadArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivos = async ( req, res = response) =>{
    
    try {
        // si se desea pasar una extension que no esta en nuestro argumento
        // const nombre = await uploadArchivo( req.files, ['txt','md'], 'carpetada' );
        // Si se desea pasar con nuestor argumento base y sin carpeta.
        const nombre = await uploadArchivo( req.files, undefined, 'img' );
        res.json( { nombre } )
        
    } catch (msg) {
        res.status(400).json({ msg })
    }

}

const actualizarImagen = async ( req, res = response ) => {
    
    const { coleccion, id } = req.params;

    let modelo;
    // buscar en la coleccion los url validos
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ){
                return res.status(400).json({
                    msg: `No existe usuario con la id ${id}`
                })
            }
            break;
    
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ){
                return res.status(400).json({
                    msg: `No existe producto con la id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Acribillen al programador'
            });
    }

    try {
        // limpiar imagenes previas
        if (modelo.img){
            // Hacer el path para borrar las imagenes del server
            // Aqui es el path hasta llegar a la imagen, solo para eso
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
            // Pregunta si existe
            if ( fs.existsSync( pathImagen) ) { // Si existe, returna true 
                fs.unlinkSync( pathImagen ); // y borra el path
            }
        }
        // guarda la imagen en el server
        const nombre = await uploadArchivo( req.files, undefined, coleccion );
        // asigna la imagen al string de modelo
        modelo.img = await nombre;
        // guarda en la DB
        await modelo.save();

        res.json({
            modelo
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Extension invalida'
        })
    }
    


    
}

const mostrarImagen = async ( req, res = response ) => {

    const { coleccion, id } = req.params;

    let modelo;
    // buscar en la coleccion los url validos
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ){
                const pathNotFound = path.join( __dirname, '../assets/no-image.jpg');
                return res.sendFile(pathNotFound);
            }
            break;
    
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ){
                const pathNotFound = path.join( __dirname, '../assets/no-image.jpg');
                return res.sendFile(pathNotFound);
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Acribillen al programador'
            });
    }

    try {
        // limpiar imagenes previas
        if (modelo.img){
            // Hacer el path para borrar las imagenes del server
            // Aqui es el path hasta llegar a la imagen, solo para eso
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
            // Pregunta si existe
            if ( fs.existsSync( pathImagen) ) { // Si existe, returna true 
               return res.sendFile( pathImagen )
            }
        } 
        const pathNotFound = path.join( __dirname, '../assets/no-image.jpg');
        return res.sendFile(pathNotFound);
             
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Extension invalida'
        })
    }
}

const actualizarImagenCloud = async ( req, res = response ) => {
    
    const { coleccion, id } = req.params;

    let modelo;
    // buscar en la coleccion los url validos
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ){
                return res.status(400).json({
                    msg: `No existe usuario con la id ${id}`
                })
            }
            break;
    
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ){
                return res.status(400).json({
                    msg: `No existe producto con la id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Acribillen al programador'
            });
    }

    try {
        // limpiar imagenes previas
        if (modelo.img){
            const split = modelo.img.split('/');
            const takingLast = split[split.length - 1];
            const [ gotem ] = takingLast.split('.');

            cloudinary.uploader.destroy( gotem );
       }
        
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

        modelo.img = secure_url;

        await modelo.save();
       
      
        res.json({
            modelo
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Extension invalida'
        })
    }
    

    
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloud
}

