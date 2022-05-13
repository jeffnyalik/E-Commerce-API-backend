const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String, required: true
        },
        description: {
            type: String, required: false
        },
        categories: {
            type: Array
        },
        size: {
            type: String
        },
        color: {
            type: String
        },
        price: {
            type: Number, required: true
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema);