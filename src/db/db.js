const { MongoClient } = require('mongodb');

let unconnectedClient;
let clientPromise;

// In development mode, use a global variable so that the value is preserved across
// module reloads caused by HMR (Hot Module Replacement). This code was adapted from:
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts
if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
        unconnectedClient = new MongoClient(process.env.MONGO_CONN_STR);
        global._mongoClient = unconnectedClient.connect();
    }
    clientPromise = global._mongoClient;
} else {
    unconnectedClient = new MongoClient(process.env.MONGO_CONN_STR);
    clientPromise = unconnectedClient.connect();
}

export default clientPromise;