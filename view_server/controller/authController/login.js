const shortUniqudId = require('short-unique-id');
const jwt = require('jsonwebtoken');

const { db } = require('../../database/postgresqlCon');

const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const data = await db.one(`select email,password from user_table where password = '${req.body.password}'`).then((result, err) => {
            if (err) return res.send("Wrong password");
            if (result) {
                const accessToken = jwt.sign(req.body.email, process.env.jwtToken);
                res.json({
                    "status": 200,
                    "data": {
                        "token": accessToken
                    },
                    "message": "Login successful.",
                    "error": null
                })
            }
        }); // implement the query for login.
        // if (!data) return res.status().json({});
        // if (!req.body.password) return res.status().json({});// enter the password;


        //     if (!result) return res.send({ errMsg: "Please enter correct password" });
        //    
        // });

    } catch (e) {
        res.send("error")
    }

}

module.exports = login;