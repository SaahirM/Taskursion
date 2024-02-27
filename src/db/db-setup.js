const { MongoClient } = require('mongodb');
const importEnvResult = require('dotenv').config();

if (importEnvResult.error) {
    throw new Error(
        "Failed to load environment variables\n" +
        importEnvResult.error.message
    );
}

if (!process.env.MONGO_CONN_STR) {
    throw new Error(
        "Cannot find database connection string in environment variables. " +
        "Please refer to README.md and make sure you've carefully followed " +
        "its instructions. You should have a .env file with a " +
        "MONGO_CONN_STR variable"
    );
}

const unconnectedClient = new MongoClient(process.env.MONGO_CONN_STR);
unconnectedClient.connect().then(async client => {
    const tasksCollection = client.db().collection("Tasks");
    await tasksCollection.createIndex(
        { "_id.user_id": 1, "_id.task_id": 1 }, { unique: true }
    );

    await client.close();
});