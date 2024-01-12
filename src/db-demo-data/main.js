const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs')
const importEnvResult = require('dotenv').config();

const client = new MongoClient(process.env.MONGO_CONN_STR);

if (importEnvResult.error) {
    throw new Error("Failed to load environment variables\n" + importEnvResult.error.message);
}

const rawDemoData = fs.readFileSync("./src/db-demo-data/demo-data.json")
const demoData = JSON.parse(rawDemoData)

client.connect()
    .then(async () => {
        for (const demoCollectionName in demoData) {
            const collection = client.db().collection(demoCollectionName)
            const demoCollectionsWithImproperIds = demoData[demoCollectionName]
            const demoCollections = demoCollectionsWithImproperIds.map(demoCollection => {
                return {
                    ...demoCollection,
                    _id: new ObjectId(demoCollection._id)
                }
            })
            await collection.insertMany(demoCollections, { ordered: false })
        }
    })
    .catch(e => {
        if (e.code !== 11000) {
            // ignore duplicate key errors while inserting
            throw e
        }
    })
    .finally(async () => {
        await client.close();
    })