const { body } = require('express-validator');
const { check } = require('express-validator');
const { Router } = require('express');

const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { pruebaValidador } = require('../middlewares/msg-validar');
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRolValido, emailExiste, comprobarUsuarioId } = require('../helpers/db-validators');
const { userControllersGet,
        userControllersPut,
        userControllersPost,
        userControllersPatch,
        userControllersDelete } = require('../controllers/user.controllers');

const validarEmail = body('correo', 'El correo no es valido').isEmail().custom( emailExiste );
const validarNombre = body('nombre','Nombre no valido, rectifique').not().isEmpty();
const validarPassword = body('password','La contrasena debe ser mayor de 6 caracteres').isLength({min:6});
// verificacion personalizada
const validarRol = body('rol').custom( esRolValido );
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
// esAdminRole se usa abajo si se quiere dar permiso solo al admin
router.delete('/:id',[ validarJWT, tieneRole('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'), validarId, pruebaValidador ], userControllersDelete) 




module.exports = router; 



