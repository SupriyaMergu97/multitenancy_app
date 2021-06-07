const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { mongodb } = require('../../../core/resources');


class AdminModel {
    constructor() {
        this.modelName = 'admin';
        this.schema = new mongoose.Schema({
            email: {
                type: String,
                CreateIndexes: { unique: true }
            },
            password: String,
            dbName: {
                type: String,
                CreateIndexes: { unique: true }
            },
            dbUri: {
                type: String, default: 'mongodb://127.0.0.1:27017/'
            }
        }).pre('save', this.encryptPassword);
    }

    getModel() {
        return mongodb.getModel(this.modelName, this.schema);
    }

    findTenentByEmail(tenent) {
        const model = this.getModel();
        const data = model.findOne({ email: tenent.email, dbName: tenent.dbName });
        return data;
    }
    createTenents(tenent) {
        const model = this.getModel();
        const result = model.create(tenent);
        return result;
    }

    fetchAllTenents() {
        const model = this.getModel();
        const result = model.find({}, { __v: 0 });
        return result;
    }

    createTenentDb(name) {
        return mongodb.changeDB(name);
    }

    tenentLogin(user) {
        const model = this.getModel();
        const result = model.findOne({ email: user.email }, { email:1, dbName:1, password: 1 });
        return result;
    }

    comparePassword(pswd,hash){
        return bcrypt.compare(pswd,hash);
    }


    encryptPassword(next) {
        const user = this;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, data) {
                if (err) return next(err);
                user.password = data;
                next();
            });
        });
    }
}

module.exports = new AdminModel()