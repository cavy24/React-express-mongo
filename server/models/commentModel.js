let mongoose = require('mongoose');

let Schema = mongoose.Schema;

//Описываем схему
let commentsSchema = new Schema({
    userId: Number,
    id: Number,
    title: String,
    body: String
});

//Добавляем модель в mongoose и экспортируем как модуль
module.exports = mongoose.model('Commits', commentsSchema);
//модель нужна только внутри маршрута