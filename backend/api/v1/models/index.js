const admin = require('./admin_model');
const user = require('./user_model');
const config = require('./config_model');

module.exports = {
    adminModel: admin,
    userModel: user,
    configModel: config
}
