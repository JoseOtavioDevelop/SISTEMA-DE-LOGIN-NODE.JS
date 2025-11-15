import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mysql2 from "mysql2/promise";

const dataBase = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

dataBase.getConnection().then(() => {
  console.log("dataBase is connected");
}).catch((err) => {
  console.error("dataBase connection error:", err);
 });

export default dataBase;

