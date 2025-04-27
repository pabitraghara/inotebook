const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Pabitraisagoodb$oy';

const fetchuser = (req, res, next) => {
    // GET bthe user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please Authenticate Using a Valid Token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate Using a Valid Token' })
    }
}

module.exports = fetchuser;
