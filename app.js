var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var http=require("http");
var io=require("socket.io").listen(app.listen(5000));


io.configure(function() {
  io.set('transports', ['websocket','flashsocket']);
  io.set('flash policy port', 843);
});


io.sockets.on("connection",function(socket){
	socket.on("connect",function(){
		console.log("Connection stablished");
		socket.emit("established","Established connection");
	});
	
	socket.on('message', function(data){		
		io.sockets.emit('message',data);
	});
	
	socket.on('close', function(data){		
		io.sockets.emit('disconnect',data);
	});
});


module.exports = app;
