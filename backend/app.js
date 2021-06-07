const server = require('./api/server');
const config = require('./core/resources/config');

(async function startServer() {
    try {
        config.validateConfig();
        await server.start();
        console.log('Server has started');

    } catch (err) {
        console.error('An instance has failed to start %s', err.stderr || err.message || JSON.stringify(err));
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }
})();