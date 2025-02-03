const mongoose = require("mongoose"); // Corrected import statement

const Itemschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const Item = mongoose.model('Item', Itemschema);
module.exports = Item;
