const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load env vars so we have DB credentials
const result = dotenv.config({ path: '.env.local' });
if (result.error) {
  throw new Error("Failed to load environment variables\n" + result.error.message);
}

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_SCHM
}).promise();

db.query("SELECT * FROM user")
  .then(([rows, fields]) => {
    console.log(rows);
    console.log(fields);
  })
  .catch(error => {
    throw new Error("Query failed\n" + error.message);
  })
  .finally(() => {
    db.end();
  });
