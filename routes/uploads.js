const { Router } = require('express');
const { check, body } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloud } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const { pruebaValidador } = require('../middlewares/msg-validar');
const { validarSubirArchivo } = require('../middlewares/validar-archivo');
const router = Router();


router.post('/',[
    validarSubirArchivo
] ,cargarArchivos);

router.put('/:coleccion/:id',[
    validarSubirArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => allowedCollections( c, ['usuarios', 'productos'] ) ),
    pruebaValidador
// ] ,actualizarImagen);
], actualizarImagenCloud)

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => allowedCollections( c, ['usuarios', 'productos'] ) ),
    pruebaValidador
] ,mostrarImagen);

module.exports = router;