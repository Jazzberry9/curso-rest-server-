const { Router } = require('express');
const { check, body } = require('express-validator');
const { crearCategoria, 
        obtenerCategoriasVarias, 
        obtenerCategoriaSingle, 
        actualizarCategoria, 
        ocultarCategoria 
    } = require('../controllers/categorias');
    
const { comprobarCategoriaId } = require('../helpers/db-validators');
const { pruebaValidador } = require('../middlewares/msg-validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// Creacion de peticiones

// Obtener todas las categorias - publica
router.get('/',[
    pruebaValidador
],obtenerCategoriasVarias)

// Obtener categoria por id - publica
router.get('/:id',[
    check('id', 'No es un Id valido de MongoDb').isMongoId(),
    check('id').custom( comprobarCategoriaId ),
    pruebaValidador
],obtenerCategoriaSingle)

// Creando categorias - cualquier persona con token valido
router.post('/',[ 
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    pruebaValidador
], crearCategoria)

// actualizar categoria - privado - token valido
router.put('/:id',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( comprobarCategoriaId ),
    pruebaValidador
],actualizarCategoria)

// borrar categoria - solo admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE'),
    check('id', 'No es un Id valido de MongoDb').isMongoId(),
    pruebaValidador,
    check('id').custom( comprobarCategoriaId ),
    pruebaValidador
],ocultarCategoria)





module.exports = router;