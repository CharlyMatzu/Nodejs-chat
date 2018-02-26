var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

//vistas que va a cargar
app.use(express.static("client"));

//Ruteando
app.get("/hola-mundo", function(request, response){
    response.status(200).send("Hola mundo desde una ruta");
});

//almacenamiento de mensajes
//mensaje por defecto
var mensajes = [
    {
        id: 1,
        text: "Bienvenido al chat",
        nickname: "BOT"
    }
];
    

//conexiones de los clientes (socket io)
io.on("connection", function(socket){
    console.log(socket.handshake.address + "- se ha conectado");
    
    //le envia el array de mensajes
    socket.emit("mensajes", mensajes);

    //recoge el evento (mensaje recibido)
    socket.on('add-mensaje', function(data){
        console.log('mensaje recibido de '+data.nickname);
        //agrega el nuevo dato al array de mensajes
        mensajes.push(data);
        // Emite a todos los sockets el nuevo array
        io.sockets.emit("mensajes", mensajes);
    });
});

//iniciando servidor
server.listen(8080, function(){
    console.log("Servidor funcionando en: http://localhost:8080");
});