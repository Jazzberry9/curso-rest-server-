const { response, request } = require("express");
const anyName = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

    const googleSignIn = async( req = request, res = response) => {

        const { id_token } = req.body;

        try {
            
            const { correo, nombre, img } = await googleVerify( id_token )

            let randomaver = await anyName.findOne({ correo })

            if ( !randomaver ){
                const data = {
                    nombre,
                    correo,
                    password: 'simply',
                    img,
                    // rol: 'USER_ROL',
                    google: true
                }

                randomaver = new anyName( data )
                await randomaver.save();
            }

            // Check si el usuario ha sido puesto como false en la BD
            if (!randomaver.estado){
                res.status(401).json({
                    msg: 'Hable con el admin, usuario bloqueado'
                })
            }

            // GENERAR JWT
            const token = await generarJWT( randomaver.id );

            res.json({
                randomaver,
                token
            })

        } catch (error) {
            res.status(400).json({
                ok:false,
                msg: 'token no se pudo verificar'
            })
        }
    }

module.exports = {
    login,
    googleSignIn
}