/**
 * Main file. This file starts a local server with the web app
 * This code was adapted from the node.js quickstart guide @ 17-Feb-2023
 * URL: https://nodejs.dev/en/learn/
 */

const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const mime = require('mime-types');

const hostname = '127.0.0.1';
const port = 2048;

let dbCreds = fs.readFileSync("server/DB/secret.json", 'utf-8');
const DB = mysql.createConnection(JSON.parse(dbCreds));

const server = http.createServer((req, res) => {
  let result = getFile(req.url);

  res.statusCode = result.code;
  res.setHeader('Content-Type', result.type);
  res.end(result.data);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Retrieves a file within the app
 * @param {String} path filepath to get file from
 * @returns An object with the appropriate file data, http code
 *          and MIME type
 */
function getFile(path) {
  let cleanedPath = path.replace("../", "");
  cleanedPath = path === "/" ? "/index.html" : path;

  let content, httpCode, fileType;
  try {
    content = fs.readFileSync("app" + cleanedPath);
    let mime_type = mime.lookup(cleanedPath);
    fileType = mime_type ? mime_type : "application/octet-stream";
    httpCode = 200;
  } catch (e) {
    if (e.code === "ENOENT") {
      content = "That file doesn't exist";
      fileType = "text/plain";
      httpCode = 404;
    } else {
      console.log(e);
      content = "Uh oh, something went wrong on the server";
      fileType = "text/plain";
      httpCode = 500;
    }
  }

  return {data: content, code: httpCode, type: fileType};
}