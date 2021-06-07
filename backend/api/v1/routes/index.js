const express = require('express');
const router = express.Router();

const admin = require('./admin');
const user = require('./user');

router.use(`/${admin.route}`, admin.router);
router.use(`/${user.route}`, user.router);

module.exports = {
    routes: router
};