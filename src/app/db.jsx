const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_CONN_STR);
export default client;