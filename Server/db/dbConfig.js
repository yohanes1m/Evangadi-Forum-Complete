const mysql2 = require("mysql2");
const dbconnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,

  // user: "evangadimydb",
  // database: "evangadimydb",
  // host: "localhost",
  // password: "123456",
});


module.exports = dbconnection.promise();
