const dotenv = require('dotenv');

function loadEnvConfig() {
    dotenv.config();
    const config = {
        mongodbUri: process.env.MONGO_DB_URI,
        masterDB: process.env.MASTER_DB,
        jwtSecretKey:process.env.TOKEN_SECRET_KEY
    };
    return config;
}

function validateConfig() {
    const cfg = loadEnvConfig();
    Object.keys(cfg).forEach((key) => {
        if (cfg[key] === 'undefined' || typeof cfg[key] === 'undefined' || cfg[key] === '') {
            throw new Error(`Please define "${key}" configuration value. See your .env file or the environment variables of your system to configure the missing parameters.`);
        }
    });
    return true;
}

module.exports = {
    config: loadEnvConfig,
    validateConfig
}