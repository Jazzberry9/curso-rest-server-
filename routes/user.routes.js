
const { Router } = require('express');
const { userControllersGet,
        userControllersPut,
        userControllersPost,
        userControllersPatch,
        userControllersDelete } = require('../controllers/user.controllers');

// viene de express
const router = Router();

// Esto es un endpoint btw
// Se llama a la referencia, pero no se ejecuta userControllersGet
router.get('/', userControllersGet)  

// el :id, es la manera dinamica de obtener un valor de la url propocionada por el user
// Colocamos lo que querramos pero usual es el id
router.put('/:id', userControllersPut) 

router.post('/', userControllersPost) 

router.patch('/',userControllersPatch) 

router.delete('/', userControllersDelete) 




module.exports = router; 



