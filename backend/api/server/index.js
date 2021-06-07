const express = require('express');
const util = require('util');
const cors = require('cors');

const { routes } = require('../v1/routes');
const resource = require('../../core/resources');
const middleware = require('../../core/middlewares');

const PARAMS = {
    basePath: '/api',
    supportedVersions: ['v1'],
    currentVersion: 'v1'
};

let app;
let httpServer = null;


function shutdownServer() {
    return new Promise((resolve) => {
        if (httpServer) {
            httpServer.close();
            httpServer = null;
            app = null;
        } else {
            console.warn('Server instance is not running...');
        }
        resolve();
    });
}

function startServer() {
    return new Promise((resolve) => {
        console.log('Server PORT: ', process.env.PORT);
        resolve(app.listen(process.env.PORT));
    });
}

async function shutdown() {
    try {
        await shutdownServer();
        // close any resource are available
    } catch (error) {
        console.error('Something went wrong on shutdown', error);
    }
}

async function start() {
    try {
        if (httpServer) {
            await shutdown();
        }

        // start resource here
        app = express();

        // initialize app global middlewares
        app.use('*', cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(middleware.global);
        app.use(util.format('%s/%s', PARAMS.basePath, PARAMS.currentVersion), routes);

        await resource.start();

        /**
         * ERROR HANDLING
         */
        app.use(function (err, req, res, next) {
            const statusCode = err.statusCode ? err.statusCode : 500;
            const message = err.message ? err.message : 'Something has gone wrong, and we did not handle this correctly.';
            res.status(statusCode);
            console.error(err.stack)
            res.status(statusCode).send({
                error: statusCode,
                message
            });
        });

        app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'No match route found.' }));
        httpServer = await startServer();
    } catch (error) {
        console.error('Something went wrong on start', error);
    }
}


module.exports = {
    start,
    shutdown
}