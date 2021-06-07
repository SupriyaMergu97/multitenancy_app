const headerCheckMiddleWare = require('./header_check');
const authCheckMiddleware = require('./token_middleware');

module.exports = {
    global: [
        headerCheckMiddleWare,
        authCheckMiddleware
    ]
}