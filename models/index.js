

const Categoria = require('./categoria');
const Producto = require('./producto');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');


module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario
}

// // Esta es la otra manera
// module.exports = require('./categoria');
// module.exports = require('./role');
// module.exports = require('./server');
// module.exports = require('./usuario');


