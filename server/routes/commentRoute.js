let express = require('express');
let CommentsModel = require('../models/commentModel');

let router = express.Router();

//Получение постов
router.get('/', function (req, res, next) { // '/' означает '/api/commits'(как указано в server.js); если после слэша указать ещё пар-ры, то указываемый адрес будет склеиваться с '/api/commits'
 // res.json({"status": "ok"});//работает: localhost:8082/api/commits
  CommentsModel.find({}, function (err, commits) {
        //Если ошибка
        if(err){
         return next(err);
        }
        //Если посты получены
        res.json(commits);
    });
});

//Добавление поста в БД
//Если используется post, то вместо router.get() необходимо использовать router.post()
router.get('/add', function (req, res, next) {
    let userId = req.query.userId;
    let id = req.query.id;
    //let title = req.query.title;
    //let body = req.query.body;
    //TODO: получить body и выполнить сохранение модели
    //http://mongoosejs.com/docs/models.html

    res.json({status: "ok", userId, id});
});

module.exports = router;