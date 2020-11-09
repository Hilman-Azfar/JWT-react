const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// logging to console
app.use(morgan('dev'));

// logging to file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  })
app.use(morgan('combined', { stream: accessLogStream }))

// connect to db
// useCreateIndex: true, 
const connectionOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
}
const client = new MongoClient(process.env.MONGO_URI ||config.URI, connectionOptions);
client.connect((err, db) => {
  if(err){
    console.error(err)
    // db not connected, tell clients service unavailable
    app.get('*', function(req, res) {
      res.status(500);
      res.json({
        errorMessage: 'service unavailable'
      })
    })
  } 
  // only when db is connected then we open routes
  console.log('-- db connected --');

  // get database
  const chatterboxDB = db.db('chatterbox');

  module.exports = chatterboxDB;

  // load routes
  // check if server is up
  app.get('/ping', function (req, res) {
    const time = new Date().toUTCString();
    res.json({
      message: `Server running: ${time}`
    })
  })

  // auth routes
  app.use('/auth', require('./routes/auth'));

  // error handling
  // catch all 404
  function genericError(req, res, next) {
    const err = new Error('not found...');
    err.status = 404;
    next(err);
  }

  function errorHandler(err, req, res, next) {
    const { status, message } = err;
    let statusCode = status || 404;
    let errorMessage = message || 'Resource not found...';
    res.status(statusCode);
    res.json({
      errorMessage
    })
  }

  app.use(genericError);
  app.use(errorHandler);
})


const PORT = config.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`-- Server listening on port ${PORT} --`);
})

function shutdown() {
  console.log('-- Server & db connection closing --');
  client.close(() => {
    console.log('-- Shut down db connection --')
    server.close(() => {
      console.log('-- Server closed || Goodbye --');
      process.exit(0);
    })
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);