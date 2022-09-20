const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Producto, Categoria } = require("../models")


const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'producto',
    'roles'
];


const buscarUsuario = async ( termino = '', res = response) => {

    const isIdMongo = ObjectId.isValid( termino ); // regresa true si se usa id de mongo

    if (isIdMongo){
        const user = await Usuario.findById( termino )
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const checkingUser = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{ estado: true }]}
    )

    res.json({
        results: checkingUser
    })

}

const buscarCategoria = async ( termino = '', res = response ) => {

    const isIdMongo = ObjectId.isValid( termino ); 

    if (isIdMongo){
        const categoria = await Categoria.findById( termino )
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }
    const regex = new RegExp(termino, 'i');

    const checkingCat = await Categoria.find({nombre: regex, estado: true }).populate('usuario', 'nombre')

    res.json({
        results: checkingCat
    })

}

const buscarProducto = async ( termino = '', res = response) => {

    const isIdMongo = ObjectId.isValid( termino ); 

    if (isIdMongo){
        const producto = await Producto.findById( termino )
                            .populate('categoria', 'nombre')
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const checkingProducto = await Producto.find({nombre: regex, estado: true })
                            .populate('categoria', 'nombre')
                                    

    res.json({
        results: checkingProducto
    })

}

const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Invalid collection, las colecciones validas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
        break;
        case 'categoria':
            buscarCategoria(termino, res)
        break;
        case 'producto':
            buscarProducto(termino, res)
        break;
        default:
            res.status(500).json({
                msg: 'Me olvide de hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}





