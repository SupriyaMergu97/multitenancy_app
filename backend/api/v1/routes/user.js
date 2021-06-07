const express = require('express');
const router = express.Router();
const { userModel } = require('../models');

const ROUTE_URI = 'users';

async function users(req, res) {
    const { dbname } = req.headers;
    const result = await userModel.fetchUsers(dbname);
    res.json(result);
}

async function createUsers(req, res) {
    const { dbname } = req.headers;
    const body = req.body;
    const result = await userModel.createUser(dbname, body);
    res.json(result);
}

router.get('/', users);
router.post('/', createUsers);

module.exports = {
    route: ROUTE_URI,
    router
}