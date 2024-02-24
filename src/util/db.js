const { MongoClient } = require('mongodb');

let client;

// In development mode, use a global variable so that the value is preserved across
// module reloads caused by HMR (Hot Module Replacement). This code is from:
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts
if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global;

    if (!globalWithMongo._mongoClient) {
        client = new MongoClient(process.env.MONGO_CONN_STR);
        globalWithMongo._mongoClient = client;
    }
    client = globalWithMongo._mongoClient;
} else {
    client = new MongoClient(process.env.MONGO_CONN_STR);
}

export default client;