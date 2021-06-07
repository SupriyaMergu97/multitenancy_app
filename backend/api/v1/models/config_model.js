const mongoose = require('mongoose');
const { mongodb } = require('../../../core/resources');

class ConfigModel {
    constructor() {
        this.modelName = 'configuration';
        this.schema = new mongoose.Schema({
            key: String,
            value: String
        });
    }

    getModel(dbName) {
        return mongodb.getModel(this.modelName, this.schema, dbName);
    }

    createConfig(dbName, config) {
        const model = this.getModel(dbName);
        const result = model.create(config);
        return result;
    }

    fetchConfig(dbName) {
        const model = this.getModel(dbName);
        const result = model.find({}, { __v: 0 });
        return result;
    }
}

module.exports = new ConfigModel();