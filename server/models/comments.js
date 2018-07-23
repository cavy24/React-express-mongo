let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentsSchema = new Schema({
    userId: Number,
    id: Number,
    title: String,
    body: String
});

module.exports = mongoose.model('Comments', commentsSchema);