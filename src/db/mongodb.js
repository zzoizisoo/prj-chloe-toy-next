import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

global._mongoClientPromise = global._mongoClientPromise || null;

class Singleton {
  constructor() {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return global._mongoClientPromise;
  }
}

export const mongoClient = Singleton.getInstance();