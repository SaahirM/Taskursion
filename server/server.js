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
  let path = req.url.replace("../", "");
  if (path === "/") path = "/index.html";
  
  try {
    let content = fs.readFileSync("app" + path);
    let mime_type = mime.lookup(path) || "application/octet-stream";
    respond(res, 200, mime_type, content);
  } catch (e) {
    if (e.code === "ENOENT") {
      respond(res, 404, "text/plain", "That file doesn't exist");
    } else {
      console.log(e);
      respond(res, 500, "text/plain", "Uh oh, something went wrong on the server");
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Sends the appropriate http response after setting the header
 * @param {http.ServerResponse} serverResponse response object
 * @param {Number} httpCode http status code for header
 * @param {String} fileType MIME type of response file
 * @param {*} content response file contents
 */
function respond(serverResponse, httpCode, fileType, content) {
  serverResponse.statusCode = httpCode;
  serverResponse.setHeader('Content-Type', fileType);
  serverResponse.end(content);
}