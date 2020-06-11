const mysql = require('mysql');

const connect = () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    });
    //Para crear variables globales para TODA la app. Usar muy pocas veces
    global.db = pool;
};

module.exports = {
    conexion: connect
};