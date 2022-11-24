const repo = require('../DB/repository/userrepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'MY_SECRET_KEY';

module.exports = {
    register(req, res) {
        let userObj = req.body;
        console.log(userObj);
        bcrypt.hash(userObj.password, 10)
            .then((hash) => {
                userObj.password = hash;
                repo.register(userObj)
                    .then((data) => {
                        res.status(200).send({
                            message: "User Created Successfully",
                            data,
                        });
                    })
                    .catch((error) => {
                        res.status(400).send({
                            message: "Error creating user",
                            error,
                        });
                    })
            })
            .catch((e) => {
                res.status(400).send({
                    message: "Password was not hashed successfully",
                    e,
                });
            });
    }
    ,
    async login(req, res) {
        let userObj = req.body;
        // console.log(userObj);
        const result = await repo.login(userObj);
        if (result) {
            console.log(result);
            const token = jwt.sign({
                userId: result._id,
                email: result.email,

            },
                SECRET,
                { expiresIn: "4h" }
            );
            const email = userObj.email;
            const seller = (result.isbuyer == false);
            res.status(200).send({
                message: "User Logged In Successfully",
                token,
                email,
                seller,
            });
        }
        else {
            res.status(400).send({
                message: "Invalid Credentials",
            });
        }

    },
    async authenticate(req, res) {
        const body = req.headers.authorization;
        const token = body.split(" ")[1];
        console.log(body);
        console.log(token);
        jwt.verify(token, SECRET, function (error, decoded) {
            if (error) {
                res.status(400).send({
                    message: "Invalid Token",
                });
            }
            else if (decoded) {
                res.status(200).send({
                    message: "Token Valid",
                    decoded,
                });
            }
        });
    }
}