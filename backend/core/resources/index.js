const mongodb = require('./mongodb');

const resource = {
    mongodb
};

async function close() {
    try {
        if (resource.mongodb.isConnected) {
            await resource.mongodb.close();
        }
    } catch (error) {
        console.log(error);
    }
}

async function start() {
    try {
        await close();
        await resource.mongodb.initMongoDB();
    } catch (error) {
        console.error(error);
    }
}




module.exports = { ...resource, start, close };