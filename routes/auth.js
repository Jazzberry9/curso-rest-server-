const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { emailExiste } = require('../helpers/db-validators');
const { pruebaValidador } = require('../middlewares/msg-validar');

const router = Router();


const validarEmail = check('correo', 'El correo no es valido').isEmail();
const validarPassword = check('password','Password must be complete').not().isEmpty();

router.post('/login',[validarEmail, validarPassword, pruebaValidador], login);


module.exports = router;