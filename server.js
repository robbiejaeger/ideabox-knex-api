var path = require('path')
var express = require('express')
var apiRouter = require('./api-router')

var app = express()
app.set('port', process.env.PORT || 3000);

var staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))

app.use('/api/v1', apiRouter)

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(3000, function(){
  console.log('Express app listening on port ' + app.get('port'))
})

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app
