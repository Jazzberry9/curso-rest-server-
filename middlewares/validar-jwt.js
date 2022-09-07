const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario'); // Esto es lo que interactua con la base de datos

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header("x-token")

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
       
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // con esto leemos el usuario de la BD que corresponda al ui
        const userx = await Usuario.findById( uid ); 

        if (!userx) {
            return res.status(401).json({
                msg: 'Token no valido - userx no existe db'
            })
        }

        // Veirifcar si el uid tiene estado en true
        if (!userx.estado) {
            return res.status(401).json({
                msg: 'Token no valido - userx con estado false'
            })
        }



        req.userx = userx;

    next()    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    validarJWT
}

