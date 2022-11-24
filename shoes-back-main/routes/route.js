const express = require('express');
const userRoutes = express.Router();
const userctrl = require('../controller/userctrl');
const productctrl = require('../controller/productctrl');
const orderctrl = require('../controller/orderctrl');
const cartCtrl = require('../controller/cartctrl');

const { AUTH, LOGIN, REGISTER, PRODUCTS, ORDER, CART } = require('../utils/constants/app_constants').ROUTES;

userRoutes.post(REGISTER, userctrl.register);
userRoutes.post(LOGIN, userctrl.login);
userRoutes.get(AUTH, userctrl.authenticate);
userRoutes.post(PRODUCTS.ADD, productctrl.addProduct);
userRoutes.get(PRODUCTS.FETCH, productctrl.fetchProducts);
userRoutes.get(PRODUCTS.FETCHONE, productctrl.fetchProduct);
userRoutes.post(PRODUCTS.DELETE, productctrl.deleteProduct);
userRoutes.post(PRODUCTS.UPDATE, productctrl.updateProduct);
userRoutes.post(ORDER.ADD, orderctrl.addOrder);
userRoutes.get(ORDER.FETCH, orderctrl.fetchOrders);
userRoutes.post(CART.ADD, cartCtrl.add);
userRoutes.post(CART.UPDATE, cartCtrl.update);
userRoutes.post(CART.DELETE, cartCtrl.delete);
userRoutes.get(CART.FETCH, cartCtrl.fetch);

module.exports = userRoutes;