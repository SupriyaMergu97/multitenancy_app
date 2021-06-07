const { authService } = require('../../api/v1/services');
module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    if (req.path.match(/admin/)) {
        // excluding for admin route
        return next();
    }
    if (token) {
        token = token.split(' ')[1];
        const isValidToken = authService.validateToken(token);
        if (isValidToken) next();
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(400).json({ message: 'Some headers are missing' });
    }
}