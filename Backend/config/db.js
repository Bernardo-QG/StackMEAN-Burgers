const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(() => console.log('Mongo conectado ${dbURL}'))
    .catch(err => console.log('Error en al conexion ${err}'))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongo se a desconectado');
            process.exit(0)
        });
    });
}