const jwt = require('jsonwebtoken');
const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1];
    console.log("came here", token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.jwtToken, (err, email) => {
        console.log("came here 1 ");

        if (err) return res.sendStatus(403);
        req.email = email;
        next();
    })
}

module.exports = { authToken };