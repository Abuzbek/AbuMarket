const createError = require('http-errors');

const express = require('express');

const path = require('path');

const Users = require('./model/Users')

const cookieParser = require('cookie-parser');

const logger = require('morgan');
//  ======= ENV ===========
const env = require('dotenv').config()
//  ============== ENV =========== 
const sassMiddleware = require('node-sass-middleware');
//  ====== validators ============
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcryptjs')
//  ====== validators ============

// ======== mongoose connection ========
const mongoose = require('mongoose')

const monDb = require('./MongoDb/mongoose')

mongoose.connect(monDb.local, {  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongodb ulanildi hozircha local');
});

// ======== mongoose connection ========

// ===== routes ==========

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signUpRouter = require('./routes/register')
const adminRouter = require('./routes/admin')
const productIdRouter = require('./routes/productId')



// ===== routes ==========

const app = express();

//============== messages ==============

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//============== messages ==============
// ============== express-sessions ==============

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {
     maxAge:14*24*36000000
  }
}))

// ============== express-sessions ==============
// ============== express-validator ==============

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      let namespace = param.split('.')
          , root = namespace.shift()
          , formParam = root

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      }
  }
}));

// ============== express-validator ==============

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
//  ============= href folder ==========
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// ======== passport setup ========


require('./helper/passport')(passport)

app.use(passport.initialize())

app.use(passport.session())
app.get('*' , (req,res,next)=>{
 res.locals.user = req.user || null;
 next()
})

// ======== passport setup ========
//  ============= href folder ==========


app.use('/', indexRouter);
app.use('/', adminRouter);
app.use('/users', usersRouter);
app.use('/', signUpRouter);
app.use('/', productIdRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
