const { mongodb } = require('../../../core/resources');
const { configModel } = require('../models');

async function provisionTenent(name) {
    mongodb.changeDB(name);
    const result = await configModel.createConfig(name, [{ key: 'CREATE_DATE', value: new Date() }, { key: 'DB_NAME', value: name }]);
    return result;
}

module.exports = {
    provisionTenent
}