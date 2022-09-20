const { Router } = require("express");
const { check, body } = require("express-validator");
const { crearProducto, 
        obtenerProductos, 
        obtenerSingleProduct, 
        actualizarProducto, 
        ocultarProducto } = require("../controllers/productos");

const { comprobarCategoriaId, comprobarProductoId } = require("../helpers/db-validators");

const { pruebaValidador } = require("../middlewares/msg-validar");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const router = Router();

// all products
router.get('/', [
    pruebaValidador
], obtenerProductos)

// single products
router.get('/:id',[
    check('id', 'No es un Id valido de MongoDb').isMongoId(),
    check('id').custom( comprobarProductoId ),
    pruebaValidador
], obtenerSingleProduct)

router.post('/',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('categoria','No es un id de Mongo').isMongoId(),
    body('categoria').custom( comprobarCategoriaId ),
    pruebaValidador
],crearProducto);
    
router.put('/:id',[
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( comprobarProductoId ),
    pruebaValidador
] ,actualizarProducto)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom( comprobarProductoId ),
    pruebaValidador
] ,ocultarProducto)





module.exports = router;




