const { response } = require("express");
const { Categoria } = require("../models");


// Obtener categorias - paginado - dar el total - populate (obtener datos de usuario que ha creado).
const obtenerCategoriasVarias = async ( req, res = response ) => {
    const { noMoreThan = 5, from = 0} = req.query;
    const checkEstado = { estado : true };
    
    const [ totalCategorias, CategoriaExistente ] = await Promise.all([
        Categoria.countDocuments(checkEstado),
        Categoria.find(checkEstado)
            .limit(Number(noMoreThan))
            .skip(Number(from))
            .populate("usuario", "nombre")
    ]);
   
    res.json({totalCategorias,CategoriaExistente})
}
// Obtener categoria - populate { objeto de la categoria }
const obtenerCategoriaSingle = async ( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate("usuario", "nombre")

    res.json({
        categoria
    })


}

// Crear caregoria
const crearCategoria = async (req , res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    

    if (categoriaDB){
        return res.status(401).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    
    // Generar data a guardar
    // la data se crea para guardar lo que queremos 
    // y no lo que nos mandan del post
    // usamos el id del jwt para guardarlo
    const data = {
        nombre,
        usuario: req.userx._id,
    }

    const categoria = new Categoria ( data )

    await categoria.save()

    res.status(201).json(categoria)
}

// actualizar categoria - en teoria solo recibe el nombre - change that name.
const actualizarCategoria = async( req, res=response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    // se pasa a uppercase porque se ha guardado el name asi
    data.nombre  = data.nombre.toUpperCase();
    // obtiene al dueyo del token
    data.userx = req.userx._id;

    const updateCategoria = await Categoria.findByIdAndUpdate( id, data , { new: true } );

    res.json(updateCategoria);

}

// Borrar categoria - remember que es ocultar el estado.
const ocultarCategoria = async( req, res ) => {

    const { id } = req.params;
    // el new : true es para que se refleje el cambio de una vez
    const byeCat = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json({
        byeCat
    })

}


module.exports = {
    crearCategoria,
    obtenerCategoriasVarias,
    obtenerCategoriaSingle,
    actualizarCategoria,
    ocultarCategoria
}

