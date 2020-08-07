// 'use strict';
// const mysql = require('mysql');

// //local mysql db connection
// const dbConn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'node_mysql_crud_db',
//   socketPath: '/var/run/mysqld/mysqld.sock' // for linux or mac
// });
// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });
// module.exports = dbConn;

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "node_mysql_crud_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock"
    }
};