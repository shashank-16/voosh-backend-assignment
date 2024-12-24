const { db } = require('../../database/postgresqlCon');

const userSignUp = (req, res) => {
    let body = req.body;
    db.none(`insert into user_table(email,password,role)` + `values( '${body.email}', '${body.password}','ADMIN')`, req.body).then((data) => {

        console.log("data from -> ", data);
        res.status(201).json({
            "status": 201,
            "data": null,
            "message": "User created successfully.",
            "error": null
        })
    }).catch(function (err) {
        console.log(err);
        return res.send("error in database");
    })


};

const getUsers = (req, res) => {

    db.any(`select * from user_table;`, req.body).then((data) => {

        res.send(data)
    }).catch(function (err) {
        console.log(err);
        return res.send("error in database");
    })
};

module.exports = {
    userSignUp: userSignUp,
    getUser: getUsers
};