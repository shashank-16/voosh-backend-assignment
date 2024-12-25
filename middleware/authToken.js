const jwt = require('jsonwebtoken');
const { db } = require('../view_server/database/postgresqlCon');

const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1];
    console.log("came here", token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.jwtToken, (err, email) => {
        if (err) return res.status(401).json({
            "status": 401,
            "data": null,
            "message": "Unauthorized Access",
            "error": null
        })
        req.email = email;
        next();
    })
}

const roleAuthToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    db.one(`select * from authtable where authToken = '${token}'`).then((data, err) => {

        console.log("role data", data);
        if (data.role != 'Admin') return res.status(403).json({
            "status": 403,
            "data": null,
            "message": "Forbidden Access/Operation not allowed.",
            "error": null
        })
        if (data.role == 'Admin') {

            next();
        }
    })
}
module.exports = { authToken, roleAuthToken };