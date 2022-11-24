const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    orderItems:
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        address: { type: String, },
        quantity: { type: Number, default: 1 },
        price: { type: Number, },
        timestamp: { type: Date, default: Date.now }
    },  
});
module.exports = mongoose.model.Orders || mongoose.model("Orders", OrderSchema);