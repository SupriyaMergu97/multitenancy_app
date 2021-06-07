const mongoose = require('mongoose');
const { config } = require('./config');


class MongoDB {

    constructor() {
        this.masterDBName = null;
        this.masterDb = null;
        this.isConnected = false;
        this.masterConnection = null;
        this.pool = {};
        mongoose.Promise = Promise;
    }

    async initMongoDB() {
        try {
            const envConfig = config();
            const { mongodbUri, masterDB } = envConfig;
            console.log('Mongo DB master DB URI', mongodbUri);
            console.log('Mongo DB master DB NAME', masterDB);
            this.masterDBName = masterDB;
            const dbConn = await mongoose.connect(mongodbUri,
                { useNewUrlParser: true, useUnifiedTopology: true });

            // change db to master db;
            this.masterDb = mongoose.connection.useDb(masterDB);
            this.isConnected = true;
            this.pool[masterDB] = this.masterDb;
            this.masterConnection = dbConn;
            return dbConn;
        } catch (error) {
            this.isConnected = false;
            console.error('Something went wrong while mongo init connection', error);
            throw error;
        }
    }

    changeDB(dbName) {
        if (!this.pool[dbName]) {
            this.pool[dbName] = mongoose.connection.useDb(dbName);
        }
        return this.pool[dbName];
    }


    async close() {
        await this.masterConnection.close();
        this.isConnected = false;
    }

    getModel(modelName, schema, dbName = this.masterDBName) {
        if (!this.pool[dbName]) {
            // throw new Error('No db found');
            this.changeDB(dbName);
        }
        return this.pool[dbName].modelNames().includes(modelName)
            ? this.pool[dbName].model(modelName)
            : this.pool[dbName].model(modelName, schema);
    }
}

module.exports = new MongoDB();
