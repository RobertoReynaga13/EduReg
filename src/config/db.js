require('dotenv').config();

const sql = require('mssql');
const passwordServer= process.env.DATABASE_PWD;
const servidor = process.env.DATABASE_SERVER;
const dbUser = process.env.DATABASE_USER;
const dbNombre = process.env.DATABASE_NAME;

const dbConfig = {
    user: dbUser,
    password: passwordServer,
    server: servidor,
    database: dbNombre,
    options: {
        encrypt: true,
        trustServerCertificate: true, // Solo para desarrollo local
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos MSSQL');
        return pool;
    })
    .catch(err => console.log('Error en la conexión a la base de datos:', err));
    module.exports = {
        sql, poolPromise
    };
