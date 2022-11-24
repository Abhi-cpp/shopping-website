const repo = require("../DB/repository/cartrepo");
const userRepo = require("../DB/repository/userrepo");
const jwt = require('jsonwebtoken');
const SECRET = 'MY_SECRET_KEY';


module.exports = {
    async add(req, res) {
        console.log("called cart add");
        var obj = req.body;
        var auth = null;
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                res.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        var cartObject = {};
        cartObject.user = auth.userId;
        cartObject.product = obj.product._id;
        cartObject.quantity = obj.quantity;
        console.log("cartobj;::::", cartObject);
        const result = await repo.getByProduct(cartObject);
        console.log("### " + result);
        if (result) {
            res.status(400).send({
                message: "Already in Cart"
            })
        }
        else {
            repo.add(cartObject).then(data => {
                res.status(200).send({
                    message: "Product added to cart Successfully",
                    data,
                });
            }).catch(err => {
                res.status(400).send({
                    message: "Some error occured"
                });
            })
        }
    },
    update(request, response) {
        var obj = request.body;
        var auth = null;
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                response.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        var cartObject = {};
        cartObject.user = auth.userId;
        cartObject.product = obj.product._id;
        cartObject.quantity = obj.quantity;
        repo.update(cartObject).then(data => {
            response.status(200).send({
                message: "Updated Successfully",
                data,
            });
        }).catch(err => {
            response.status(400).send({
                message: "Some error occured", err,
            })
        })
    },
    delete(request, response) {
        var obj = request.body;
        var auth = null;
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                response.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        var cartObject = {};
        cartObject.user = auth.userId;
        cartObject.product = obj.product._id;
        repo.delete(cartObject).then(data => {
            response.status(200).send({
                message: "Deleted Successfully",
                data,
            });
        }).catch(err => {
            response.status(400).send({
                message: "Some error occured", err,
            })
        })
    },
    async fetch(request, response) {
        var auth = null;
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                response.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        const result = await repo.getByUser(auth.userId);
        if (result) {
            response.status(200).send({
                message: "Users Data Found", result
            })
        }
        else {
            response.status(400).send({
                message: "error"
            })
        }
    },
}