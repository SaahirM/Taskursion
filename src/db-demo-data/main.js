const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const importEnvResult = require('dotenv').config();

const HEX_REGEX = /[0-9A-Fa-f]*/;

const client = new MongoClient(process.env.MONGO_CONN_STR);

if (importEnvResult.error) {
    throw new Error("Failed to load environment variables\n" + importEnvResult.error.message);
}

const rawDemoData = fs.readFileSync("./src/db-demo-data/demo-data.json");
const demoData = JSON.parse(rawDemoData);

client.connect()
    .then(async () => {
        const tasksCollection = client.db().collection("Tasks");
        await tasksCollection.createIndex(
            { "_id.user_id": 1, "_id.task_id": 1 }, { unique: true }
        );
        //TODO delete default idnex

        for (const demoCollectionName in demoData) {
            const collection = client.db().collection(demoCollectionName);
            const demoCollectionsWithImproperIds = demoData[demoCollectionName];

            const demoCollections = demoCollectionsWithImproperIds.map(demoCollection => {
                const id = demoCollection._id;
                const isIdHexString = typeof id === 'string' && HEX_REGEX.test(id);
                if (isIdHexString || typeof id === 'number') {
                    return {
                        ...demoCollection,
                        _id: new ObjectId(id)
                    };
                }

                return demoCollection;
            });

            await collection.insertMany(demoCollections, { ordered: false });
        }
    })
    .catch(e => {
        if (e.code !== 11000 && e.code !== 86) {
            // ignore duplicate index errors and duplicate key errors while inserting
            throw e;
        }
    })
    .finally(() => client.close());