const { response } = require("express");
const anyName = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req,res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar que el email existe
        const anything = await anyName.findOne({correo})
        if (!anything){
            return res.json({
                msg: 'Clave/Correo son incorrectos - Correo'
            });
        }
        
        // Si el usuario esta activo
        if (!anything.estado){
            return res.json({
                msg: 'Clave/Correo son incorrectos - estado:false'
            });
        }
        
        // Check password again
        const passChecking = bcryptjs.compareSync(password, anything.password)
        if (!passChecking){
            return res.json({
                msg: 'Clave/Correo son incorrectos - password incorrecta'
            });
        }

        // Generar el JWT
        // el payload es lo que esta dentro del parentesis
        const token = await generarJWT( anything.id );

        res.json({
            anything,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'hable con el admi'
        })
    }

    
    
};

module.exports = {
    login
}