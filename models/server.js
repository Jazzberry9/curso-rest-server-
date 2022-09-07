const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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
    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/user.routes'));
    }
    listen(){
        this.app.listen( this.port, ()=>{
            console.log("Servidor corriendo en puerto:", this.port);
        });
    }


}


module.exports = Server;

