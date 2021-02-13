const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = new Schema({
    email: string,
    responded: {type: Boolean, default: false}
});

module.exports = RecipientSchema;