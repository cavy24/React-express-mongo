let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');

let routeComments = require('./routes/commentRoute');

mongoose.connect('mongo://localhost:27017/comments');

let app = new express;
