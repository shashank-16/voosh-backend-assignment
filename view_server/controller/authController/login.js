const shortUniqudId = require('short-unique-id');
const jwt = require('jsonwebtoken');

const { db } = require('../../database/postgresqlCon');


const login = async (req, res) => {
    try {
        let body = req.body;
        if (body.email === undefined || body.password === undefined) {
            let missingField = body.email === undefined ? 'email' : 'Password';
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": `Bad Request, Reason:${missingField} is missing.`,
                "error": null
            });
        }
        const data = await db.one(`select email,password,role from user_table where email = '${body.email}' AND  password = '${body.password}'`).then((result) => {
            if (result) {
                const accessToken = jwt.sign(body.email, process.env.jwtToken);
                const authData = db.none(`insert into authtable(authToken ,role)` + `values( '${accessToken}' , '${result.role}' )`, req.body).then(() => { });

                res.status(200).json({
                    "status": 200,
                    "data": {
                        "token": accessToken
                    },
                    "message": "Login successful.",
                    "error": null
                })
            }
        });
    } catch (e) {
        if (e.received === 0) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "User not found.",
                "error": null
            });
        }
    }

}

module.exports = login;