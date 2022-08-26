const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Middlewares
        this.middlewares();
        // rutas de mi aplicacion
        this.routes();
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
        this.app.use( this.usuariosPath, require('../routes/user.routes'))
    }
    listen(){
        this.app.listen( this.port, ()=>{
            console.log("Servidor corriendo en puerto:", this.port);
        });
    }


}


module.exports = Server;

