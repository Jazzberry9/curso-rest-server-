const { validationResult } = require('express-validator');

// Este es el mensaje de error, si hay error, no continua a la ruta y manda el msg de error
// const pruebaValidador = (req, res, next) => {

//     const errorFormatter = ( location, msg, param) => {
//         return `Error ubicado en ${location} para la validacion de [${param}]: ${msg}`;
//         };
//         const result = validationResult(req).formatWith(errorFormatter);
//         if (!result.isEmpty()) {
//             return res.json({ errors: result.array() });
//         }
//     next();
// }

    const pruebaValidador = ( req, res, next) => {
        const errorFormatter = ( location, msg, param) => {
            return `Error ubicado en ${location} para la validacion de [${param}]: ${msg}`;
            }
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()){
            return res.status(400).json(errors);
        }
    next();
    }

module.exports = {
    pruebaValidador
}