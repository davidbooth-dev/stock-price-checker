const mongoose = require('mongoose')
const schema = mongoose.Schema;

const StockSchema = new schema({
    ips: [String],
    symbol: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
});

const Model = mongoose.model("Stock", StockSchema);

module.exports = Model;