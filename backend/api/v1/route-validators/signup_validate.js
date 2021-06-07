const { Validator } = require('jsonschema');
const v = new Validator();
function signupValidator(req, res, next) {
    try {
        const schema = {
            id: '/signup',
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
                dbName: { type: 'string' }
            },
            required: ['email', 'password', 'dbName']
        };
        const isValid = v.validate(req.body, schema, { allowUnknownAttributes: false });
        if (!isValid.errors.length) next();
        else {
            const error = isValid.errors[0];
            res.status(400).json({ status: 'Bad Request', message: `${error.property} ${error.message}` });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = signupValidator;
