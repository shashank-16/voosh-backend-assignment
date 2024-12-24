const shortUniqudId = require('short-unique-id');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const data = true; // implement the query for login. 
        if (!data) return res.status().json({});
        if (!req.body.password) return res.status().json({});// enter the password;
        //condition when password match 

    } catch (e) {
        res.send()
    }

}

module.exports = login;