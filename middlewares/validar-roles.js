const { response, request } = require("express")


const esAdminRole = ( req = request, res = response, next ) => {

    if(!req.userx){ // si esto regresa undefined
        return res.status(500).json({
            msg: 'Se quiere verificar sin validar el token primero'
        })
    }

    const { nombre, rol } = req.userx;

    if (rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `El ${nombre} no es administrador y no puede proseguir con la operacion`
        })
    }


    next();
}

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        
    if(!req.userx){ // si esto regresa undefined
        return res.status(500).json({
            msg: 'Se quiere verificar sin validar el token primero'
        })
    }

    if(!roles.includes( req.userx.rol )){ //es decir, si no tiene el usuario requested.
        return res.status(401).json({
            msg:`Servicio solo disponible para los siguientes roles: ${roles}`
        })
    }

        next();
    }



}



module.exports = {
    esAdminRole,
    tieneRole
}