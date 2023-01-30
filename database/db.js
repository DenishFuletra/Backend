const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

function ConnectionDatabase() {
    let result = mongoose.connect("mongodb+srv://unitEvul:12345@cluster0.whdjxap.mongodb.net/UnitEvul")

    return result;
}

module.exports = ConnectionDatabase;