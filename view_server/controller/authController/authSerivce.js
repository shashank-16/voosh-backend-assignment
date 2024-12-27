const { db } = require('../../database/postgresqlCon');
const userSignUp = async (req, res) => {

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

    if (body?.role == 'Admin') {
        return res.status(400).json({
            "status": 400,
            "data": null,
            "message": `Bad Request`,
            "error": null
        });
    }
    var role = body.role;
    await db.any(`select * from user_table;`).then((data) => {
        if (data.length == 0) {
            role = "Admin";
        }
    });

    await db.none(`insert into user_table(email,password,role)` + `values( '${body.email}', '${body.password}','${role}')`, req.body).then((data) => {
        res.status(201).json({
            "status": 201,
            "data": null,
            "message": "User created successfully.",
            "error": null
        })
    }).catch(function (err) {
        if (role === undefined) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": `Bad Request, Reason:Role is missing.`,
                "error": null
            });
        }
        return res.status(409).json({
            "status": 409,
            "data": null,
            "message": "Email already exists.",
            "error": null

        });
    })

}

const getUsers = async (req, res) => {
    let param = req.query;
    let paramCheck = JSON.stringify(req.query) === '{}';
    if (!paramCheck) {
        console.log(param);
        await db.any(`select user_id,email,role,created_at from user_table where role = '${param.role}' limit  ${param.limit} offset  ${param.offset}  ;`, req.body).then((data) => {
            res.status(200).json({
                "status": 200,
                "data": data,
                "message": "Users retrieved successfully.",
                "error": null
            });

        }).catch(function (err) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        })

    }
    else
        db.any(`select  user_id,email,role,created_at from user_table;`, req.body).then((data) => {
            res.status(200).json({
                "status": 200,
                "data": data,
                "message": "Users retrieved successfully.",
                "error": null
            });
        }).catch(function (err) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        })
};

const deleteUser = async (req, res) => {
    let param = req.params.user_id;

    db.result(`delete from user_table where user_id = '${param}'`).then((data) => {
        console.log(data);
        if (data.rowCount <= 0) return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "User not found.",
            "error": null
        });

        res.status(200).json({
            "status": 200,
            "data": null,
            "message": "User deleted successfully.",
            "error": null
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(404).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        })
    })

}

const updatePassword = async (req, res) => {

    let body = req.body;
    await db.none(`update user_table set password =$1 where email =$2 and password =$3`, [body.new_password, req.email, body.old_password]).then(function (data) {
        console.log(data)
        res.status(204).json({
            "status": 204,
            "data": null,
            "message": "Password updated successfully.",
            "error": null
        })
    }).catch(function (err) {
        console.log(err);
        return res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        })
    })
}


const logout = async (req, res) => {

    console.log("logout", req.email);
    db.one(`select authToken from authtable where authToken = '${req.email}'`).then((result) => {
        if (result) {
            const authData = db.none(`delete from authtable where authToken = '${req.email}'`, req.body).then(() => {
                res.status(200).json({
                    "status": 200,
                    "data": null,
                    "message": "User logged out successfully.",
                    "error": null
                })
            }).catch((err) => {
                return res.status(404).json({
                    "status": 404,
                    "data": null,
                    "message": "User not found.",
                    "error": null
                });
            });

        }
    }).catch((err) => {
        return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "User not found.",
            "error": null
        });


    });
}



module.exports = {
    userSignUp: userSignUp,
    getUser: getUsers,
    deleteUser: deleteUser,
    updatePassword: updatePassword,
    logout: logout
}