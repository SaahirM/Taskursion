/**
 * Main file. This file starts a local server with the web app
 * This code was adapted from the node.js quickstart guide @ 17-Feb-2023
 * URL: https://nodejs.dev/en/learn/
 */

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 2048;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let page = fs.readFileSync("app/index.html", 'utf-8');
  res.end(page);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});