const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs')
const importEnvResult = require('dotenv').config();

const client = new MongoClient(process.env.MONGO_CONN_STR);
const isDemoRequested = process.argv[2] === "demo-data";

if (importEnvResult.error) {
    throw new Error("Failed to load environment variables\n" + importEnvResult.error.message);
}

const rawDemoData = fs.readFileSync("./src/database-setup/demo-data.json")
const demoData = JSON.parse(rawDemoData)

client.connect()
    .then(async () => {
        const collections = {}

        for (const demoCollectionName in demoData) {
            const collection = client.db().collection(demoCollectionName)
            collections[demoCollectionName] = collection
        }

        if (isDemoRequested) {
            for (const demoCollectionName in demoData) {
                const demoCollectionsWithImproperIds = demoData[demoCollectionName]
                const demoCollections = demoCollectionsWithImproperIds.map(demoCollection => {
                    return {
                        ...demoCollection,
                        _id: new ObjectId(demoCollection._id)
                    }
                })
                await collections[demoCollectionName].insertMany(demoCollections, {ordered: false})
            }
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