const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("digital_notebook"); // database name
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDB = () => {
  return db;
};

module.exports = { connectDB, getDB };