const mongoose = require('mongoose');
const { mongodb } = require('../../../core/resources');


class UserModel {
    constructor() {
        this.modelName = 'user';
        this.schema = new mongoose.Schema({
            fullName:String,
            contact:String,
            address:String
        });
    }

    getModel(dbName) {
        return mongodb.getModel(this.modelName, this.schema, dbName);
    }

    createUser(dbName, user) {
        const model = this.getModel(dbName);
        const result = model.create(user);
        return result;
    }

    fetchUsers(dbName) {
        const model = this.getModel(dbName);
        const result = model.find({}, { __v: 0 });
        return result;
    }
}

module.exports = new UserModel();