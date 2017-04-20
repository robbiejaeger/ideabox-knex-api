var path = require('path')
var express = require('express')

var app = express()
app.set('port', process.env.PORT || 3000);

var staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.listen(3000, function(){
  console.log('Express app listening on port ' + app.get('port'))
})
