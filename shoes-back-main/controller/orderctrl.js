const repo = require('../DB/repository/orderrepo');
const jwt = require('jsonwebtoken');
const SECRET = 'MY_SECRET_KEY';


module.exports = {

    async addOrder(req, res) {
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
        var obj = req.body;
        obj.user = auth.userId;
        repo.addOrder(obj)
            .then((data) => {
                res.status(200).send({
                    message: "Order Placed Successfully",
                    data,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "Error placing order",
                    error,
                });
            })
    },
    async fetchOrders(req, res) {
        var auth = null;
        console.log("called");
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
        console.log(auth);
        
        const result = await repo.fetchOrders(auth.userId);
        if (result) {
            res.status(200).send({
                message: "Orders Fetched Successfully",
                result,
            });
        }
        else {
            res.status(400).send({
                message: "No Orders Found",
            });
        }
    }
}