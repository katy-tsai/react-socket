var express =require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var auth = require('./server/service/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile('./public/index.html');
});
app.get('/login', function (req, res) {
    res.sendFile(path.resolve('./public/login.html'));
});
io.on('connection',function(socket){
  console.log('a user connect');
  socket.on('disconnect',function(){
    console.log('a user disconnected');
  });

  socket.on('messageAdded',function(message){
    console.log(message);
    socket.broadcast.emit('messageAdded',message);
  })

  socket.on('login',function(user){
    auth.login(user);
    auth.on('errormsg',function(msg){
      console.log(msg);
        socket.emit('hasError','errormsg');
    })

    auth.on('success',function(user){
      socket.broadcast.emit('login',user);
    })

  })
})
http.listen(3000,function(){
  console.log("App listening on port 3000")
})

module.exports = app;
