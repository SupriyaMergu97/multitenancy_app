module.exports = (req, res, next) => {
    if (req.headers.dbname) {
        next();
    } else {
        res.status(400).json({ message: 'Some headers are missing' });
    }
}