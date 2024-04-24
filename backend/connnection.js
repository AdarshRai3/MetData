import mysql from "mysql";
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9664069557",
    database: "metdatadb",
});

export default db;