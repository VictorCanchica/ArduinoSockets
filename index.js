
const five = require ("johnny-five");
const express=require("express");
const app=express();
const path=require ('path');
const server=require('http').createServer(app);
const io=require ('socket.io').listen(8080);

servers =[];
connections=[];

var board = new five.Board();
board.on("ready", function() {
    const led = new five.Led(13);
  led.off() 
  
  
});

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});


io.sockets.on('connection', (socket)=>{
    connections.push(socket);
    console.log('Conectado: %s sockets connected', connections.length)

    socket.on('disconnect', (socket)=>{
        connections.splice(connections.indexOf(socket), 1);
        console.log ('Desconectado: %s sockets connected', connections.length);
    })
    
    socket.on('cambiando', function(data){
        var led = new five.Led(13);
        console.log(data);
        if(data.estado==false){
            led.off()
        }else {
            led.on()
        }
        io.sockets.emit('estado del bombillo', {msg:data})
    })

})


app.listen(3000)    






