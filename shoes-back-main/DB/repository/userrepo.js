const UserModel = require('../models/usermodel');
const { response } = require('express');
const bcrypt = require('bcrypt');


module.exports = {
    register(userObj) {
        var promise = UserModel.create(userObj);
        return promise;
    },
    async login(userObj) {
        var user = await UserModel.findOne({ email: userObj.email });
        if (user) {
            const result = await bcrypt.compare(userObj.password, user.password);
            if (result) {
                user = await UserModel.findOne({ email: userObj.email });
                return user;
            }
            else {
                return null;
            }
        }
    },
    async checkUser(userObj) {
        const promise = await UserModel.findOne({ _id: userObj.userId, email: userObj.email });
        return promise;
    }
}