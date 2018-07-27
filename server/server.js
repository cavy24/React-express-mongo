let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');

let routeComments = require('./routes/commentRoute');//подключаем маршрут
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true})
.then(() => {
  console.log("Connected to Database");
  }).catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
  });//соединяемся с базой: comments - название базы (commits - коллекция)

let app = new express;//создаём приложение с помощью express-а

//Работа с роутингом
  //Отдаём заголовки, кот. позволят нам передавать тот же ajax на другой домен, потому что, например, если у нас будет localhost port=2090, а у приложения, например, port=2050, если порт не совпадёт, то ajax-запрос просто не сделается. Исправляем этот момент:

app.use(function (req, res, next) {
  //res - ответ сервера, всё, что мы хотим, чтобы он ответил;
  //req - наоборот, запрос;
  //next - следующий callback, кот. нужно вызвать за этим, потому что роутинг обрабатывает по этапам
  res.header('Access-Control-Allow-Origin', '*');//разрешит запрос со всех доменов; '*' - это домен или домены
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');//позволит заголовок прокидывать дальше в заголовки, потому что на заголовки д.б. отдельное разрешение; 'X-Requested-With' - чтобы разрешить

  next();//вызываем next, чтобы управление перешло к след. callback-у
});

  //Обрабатываем статическую дир-рию 'dist'. Если у нас есть какой-то файл, например, index, то его нужно открыть из dist-а:
app.use(express.static(__dirname + '/dist'));//функцию генерит express через указанный express.static

  //Добавляем логгер, чтобы он логировал все запросы и выводил их в консоль:
app.use(logger('combined'));// combined - режим: комбинированный лог

//Наши запросы
app.use('/api/commits', routeComments);// первый пар-р - какой маршрут мы хотим обрабатывать. Если роутов много, то в этой строке они все указываются.

//Если ни один роут не вызовется, значит, нет статического файла и нет маршрута, тогда: 

//Обработка ошибок
app.use(function (req, res, next) {
  let err = new Error('Page Not Found');//создаём экземпляр встроенного класса Error
  err.status = 404;
  next(err);
});

//Теперь получим эту ошибку и передадим в формате json
app.use(function (err, req, res, next) {
  res.status(err.status || 500);//устанавливаем статус: забираем из err.status или указываем как ошибку сервера (здесь м.б. любой код), и передаём его в ответ - message
  res.json({
      message: err.message,
      error: err //сама ошибка
  });
});

//Поднимаем сервер
app.listen(8082, function () {
  console.log('Сервер запущен!');
});

