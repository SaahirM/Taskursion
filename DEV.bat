start npx babel --watch app/js/jsx --out-dir app/js --presets react-app/prod
start browser-sync start -p http://127.0.0.1:2048 -f 'app, server'
nodemon server/server.js