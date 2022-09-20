const { response } = require("express");
const { Producto } = require("../models");



// get single product 
const obtenerSingleProduct = async ( req, res ) => {
    const { id } = req.params;

    const singleProduct = await Producto.findById( id )
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');

    res.json(
        singleProduct
    )
}

// get productos 
const obtenerProductos = async ( req, res) => {
    
    const { limite = 5, desde = 0} = req.query;
    const checkEstado = { estado : true };
    
    const [ totalProductos, ProductosExistente ] = await Promise.all([
        Producto.countDocuments(checkEstado),
        Producto.find(checkEstado)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate("usuario", "nombre")
            .populate("categoria", "nombre")
    ]);
   
    res.json({ totalProductos, ProductosExistente })
}

// crear producto
const crearProducto = async( req, res = response ) => {
    // se extrae de esta manera para ignorar el estado y usuario
    const{ estado, usuario, ...savedHere } = req.body;
   
    const nombre = savedHere.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre });
 
    if (productoDB){
        return res.status(401).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }
    
    // Generar data a guardar
    // la data se crea para guardar lo que queremos 
    // y no lo que nos mandan del post
    // usamos el id del jwt para guardarlo
    const data = {
        ...savedHere,
        nombre: savedHere.nombre.toUpperCase(),
        usuario: req.userx._id
    }

    const producto = new Producto( data )

    await producto.save()

    res.status(201).json(producto)

}

// actualizar producto
const actualizarProducto = async ( req, res ) => {

    const { id } = req.params;

    const { usuario, estado, ...resto } = req.body;

    // si viene el name, se transforma en caps
    if (resto.nombre){
        resto.nombre = resto.nombre.toUpperCase();
    }
    // resto.userx = req.userx._id

    const updateProducto = await Producto.findByIdAndUpdate( id , resto, { new: true })

    res.json(updateProducto)
}

// ocultar producto
const ocultarProducto = async ( req, res ) => {

    const { id } = req.params;

    const hideProducto = await Producto.findByIdAndUpdate( id, { estado:false }, { new : true } )

    res.json(
        hideProducto
    )
}

module.exports = { 
    crearProducto,
    obtenerProductos,
    obtenerSingleProduct,
    actualizarProducto,
    ocultarProducto
}

