const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require("fs");

const IS_DEMO_REQUESTED = process.argv[2] === "demo-data";
const SQL_SCRIPT_PATH = 
    IS_DEMO_REQUESTED ?
    "./src/database-setup/script-with-demo-data.sql" :
    "./src/database-setup/script.sql";

// Load env vars so we have DB credentials
const result = dotenv.config({ path: '.env.local' });
if (result.error) {
  throw new Error("Failed to load environment variables\n" + result.error.message);
}

// Load MySQL script that will be run to set DB up
/* 
  In the future, it may be worth directly running the MySQL script using
  "mysqlsh" at the commandline, as opposed to running it indirectly using
  this JS script. I just can't be bothered to figure out how right now.
 */
const setupSql = fs.readFileSync(SQL_SCRIPT_PATH, 'utf-8');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  multipleStatements: true
});

db.query(setupSql, error => {
  if (error) {
    throw new Error("\"script.sql\" failed\n" + error.message);
  }
});
db.end();