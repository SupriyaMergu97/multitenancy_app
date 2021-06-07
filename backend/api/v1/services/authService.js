var jwt = require('jsonwebtoken');
const { config } = require('../../../core/resources/config')
function generateToken(data) {
    const token = jwt.sign({ data }, config().jwtSecretKey, { expiresIn: '1h' });
    return token;
}

function validateToken(token) {
    const decoded = jwt.verify(token, config().jwtSecretKey);
    if (decoded && decoded.data) {
        return true;
    }
    return false;
}

module.exports = {
    generateToken,
    validateToken
}