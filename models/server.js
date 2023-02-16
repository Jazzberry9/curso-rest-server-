const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads'
        }

        // Conectar a base de datos
        this.connectarDB();

        // Middlewares
        this.middlewares();
        // rutas de mi aplicacion
        this.routes();
    }

    async connectarDB(){
        await dbConnection()
    }


    middlewares(){

        // CORS
        this.app.use( cors() )

        // Lectura y parseo del body
        // Cualquier informacion que llegue, la transforma a json
        this.app.use( express.json())

        // directorio publico
        // use es la palabra clave de que es un middleware
        this.app.use(express.static('public'))

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/user.routes'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }
    listen(){
        this.app.listen( this.port, ()=>{
            console.log("Servidor corriendo en puerto:", this.port);
        });
    }


}


module.exports = Server;

