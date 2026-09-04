import { MongoClient } from 'mongodb';
// import dns from 'dns';

// Force Node.js to use Google's public DNS servers locally
// dns.setServers(['8.8.8.8', '8.8.4.4']);

let database;

const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URI;
    if (!connectionString) {
        throw new Error('MONGODB_URI is required.');
    }

    const client = new MongoClient(connectionString);
    await client.connect();
    // database = client.db(process.env.MONGODB_DB_NAME || 'practice');
    database = client.db(process.env.MONGODB_DB_NAME);
    return database;
};

const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }
    return database;
};

export { connectToDb, getDb };