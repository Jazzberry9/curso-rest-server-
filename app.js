require('dotenv').config();

const Server = require('./models/server'); // el import de la clase Server

const server = new Server; // es una instancia, asi llamamos a Server y lo asignamos

server.listen(); // usamos la constante para aplicarle el listen()