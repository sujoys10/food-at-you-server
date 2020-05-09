const { createUser, loginUser, updateUser } = require('./Mutation/user');
const { createVendor, updateVendor, loginVendor } = require('./Mutation/vendor');
const { createItem, updateItem, removeItem } = require('./Mutation/item');
const { createOrder, updateOrder } = require('./Mutation/order')
const { updateOrderBag } = require('./Mutation/orderBag');


module.exports = {
    createUser,
    loginUser,
    updateUser,
    createVendor,
    updateVendor,
    loginVendor,
    createItem,
    updateItem,
    removeItem,
    createOrder,
    updateOrder,
    updateOrderBag
}