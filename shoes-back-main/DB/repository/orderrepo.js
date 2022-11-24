const OrderModel = require('../models/ordermodel');
module.exports = {
    addOrder(req) {
        return new Promise((resolve, reject) => {
            const order = new OrderModel({
                user: req.user,
                orderItems: {
                    product: req.product._id,
                    address: req.address,
                    quantity: req.quantity,
                    price: req.quantity * req.product.price
                }
            });
            order.save((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    },
    async fetchOrders(id) {
        const result = await OrderModel.find({ user: id });
        if (result) {
            return result;
        }
        else {
            return null;
        }
    }
}