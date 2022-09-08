const { Router } = require('express');
const { check, body } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { pruebaValidador } = require('../middlewares/msg-validar');

const router = Router();

const validarEmail = check('correo', 'El correo no es valido').isEmail();
const validarPassword = check('password','Password must be complete').not().isEmpty();
const tokenGoogle = body('id_token', 'id_token es necesario').not().isEmpty();

router.post('/login',[validarEmail, validarPassword, pruebaValidador], login);


router.post('/google',[tokenGoogle, pruebaValidador], googleSignIn);


module.exports = router;