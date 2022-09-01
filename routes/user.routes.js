const { check } = require('express-validator');
const { Router } = require('express');

const { pruebaValidador } = require('../middlewares/msg-validar');
const { esRolValido, emailExiste, comprobarUsuarioId } = require('../helpers/db-validators');

const { userControllersGet,
        userControllersPut,
        userControllersPost,
        userControllersPatch,
        userControllersDelete } = require('../controllers/user.controllers');

const validarEmail = check('correo', 'El correo no es valido').isEmail().custom( emailExiste );
const validarNombre = check('nombre','Nombre no valido, rectifique').not().isEmpty();
const validarPassword = check('password','La contrasena debe ser mayor de 6 caracteres').isLength({min:6});
// verificacion personalizada
const validarRol = check('rol').custom( esRolValido );
const validarId = check('id', 'No es un Id valido de MongoDb').isMongoId().custom( comprobarUsuarioId );

// viene de express
const router = Router();

// Esto es un endpoint btw
// Se llama a la referencia, pero no se ejecuta userControllersGet
router.get('/', userControllersGet)  

// el :id, es la manera dinamica de obtener un valor de la url propocionada por el user
// Colocamos lo que querramos pero usual es el id
router.put('/:id', [validarId, validarRol, pruebaValidador], userControllersPut) 

router.post('/', [validarEmail, validarNombre, validarRol, validarPassword, pruebaValidador] ,userControllersPost) 

router.patch('/',userControllersPatch) 

router.delete('/:id',[ validarId, pruebaValidador ], userControllersDelete) 




module.exports = router; 



