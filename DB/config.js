const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        // esperara que la conexion se haga, sino, lo atrapa el catch
        await mongoose.connect( process.env.MONGODB_CNN, {
            useUnifiedTopology: true,
        });

        console.log("base de datos online");


    } catch (error) {
        console.log(error); // Para chequear cual es el error
        throw new Error('Error al inicializar la base de datos'); // Dispara el error
    }



}



module.exports = {
    dbConnection
}