var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var empleadosRouter = require('./routes/empleados');
var departamentosRouter = require('./routes/departamentos');

require('dotenv').config();

var app = express();

require('./db').conexion();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/empleados', empleadosRouter);
app.use('/departamentos', departamentosRouter);

module.exports = app;
