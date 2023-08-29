const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load env vars so we have DB credentials
const result = dotenv.config({ path: '.env.local' });
if (result.error) {
  throw new Error("Failed to load environment variables\n" + result.error.message);
}

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_SCHM
});

db.connect(error => {
  if (error) {  
    throw new Error("Could not connect to database\n" + error.message);
  }
});