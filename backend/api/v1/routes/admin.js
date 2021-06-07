const express = require('express');
const router = express.Router();
const { adminModel } = require('../models');
const { provisionService, authService } = require('../../v1/services');
const { loginValidator, signUpValidator } = require('../route-validators');

const ROUTE_URI = 'admin';

async function test(req, res) {
    const all = await adminModel.fetchAllTenents();
    res.json({ message: 'Hello welcome to new world', data: all });
}

async function create(req, res) {
    try {
        const body = req.body;
        const isExist = await adminModel.findTenentByEmail(body);
        if (!isExist) {
            const isProvisioned = await provisionService.provisionTenent(body.dbName);
            if (isProvisioned) {
                const result = await adminModel.createTenents(body);
                res.json({ result, isProvisioned: true });
            } else {
                res.status(400).json({ isProvisioned: false });
            }
        } else {
            res.status(400).json({ message: 'Email already exists' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

async function login(req, res) {
    const body = req.body;
    const user = await adminModel.tenentLogin(body);
    if (user) {
        const isMatch = await adminModel.comparePassword(body.password, user.password);
        if (isMatch) {
            const token = authService.generateToken(user);
            res.json({ user, token });
            // login success
        } else {
            res.status(400).json({ message: 'Invalid password' })
        }
    }
    else {
        res.status(400).json({
            message: 'login failed'
        })
        //  login failed
    }

}
router.post('/', loginValidator, login);
router.post('/create', signUpValidator, create);



module.exports = {
    route: ROUTE_URI,
    router
}