const CartModel = require("../models/cartmodel");

module.exports = {
    add(cartObject) {
        var promise = CartModel.create(cartObject);
        return promise;
    },
    async update(cartObject) {
        var result = await CartModel.findOneAndUpdate({ product: cartObject.product, user: cartObject.user }, { $set: { quantity: cartObject.quantity } });
        result = await CartModel.findOne({ product: cartObject.product, user: cartObject.user });
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    delete(cartObject) {
        const result = CartModel.findOneAndDelete({ product: cartObject.product });
        return result;
    },
    async getByUser(userObject) {
        const result = await CartModel.find({ user: userObject });
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    async getByProduct(cartObject) {
        const result = await CartModel.findOne({ product: cartObject.product, user: cartObject.user });
        if (result) {
            return result;
        }
        else {
            return null;
        }
    }
}