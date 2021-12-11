const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "qetwry",
    database: "testwad",
    host: "localhost",
    port: "5432"
});
module.exports = pool;
