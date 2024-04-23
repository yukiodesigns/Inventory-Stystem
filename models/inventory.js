const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number
})

const inventory = mongoose.model('Inventory', inventorySchema)

module.exports = inventory