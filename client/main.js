//conexion con el server
var socket = io.connect('http://10.1.0.111:8080', {'forceNew': true});

//recibimos los mensajes desde el server (server/index.js)
socket.on('mensajes', function(data){
    console.log(data);
    // se envia info para poner en el dom
    render(data);
});

/**
 * funcion para agregar el primer mensaje emitido por el servidor
 * @param {*} data 
 */
function render(data){
    var html = data.map(function(mensaje, index){
        return (`
            <div class="mensaje">
                <strong>${mensaje.nickname}</strong> dice:
                <span>${mensaje.text}</span>
            </div>
        `);
    }).join(' '); //Meter un espacio entre elementos
    
    //Obtenemos elemento de mensajes
    var div_msg = document.getElementById('mensajes');
    // agregamos nuevo mensaje (array modificado)
    div_msg.innerHTML = html;
    // Se pone escroll hasta abajo
    div_msg.scrollTop = div_msg.scrollHeight;
}

function addMensaje(e){

    // Obtiene elementos
    var nick = document.getElementById('nickname');
    var text = document.getElementById('text');

    if( nick.value === '' || text.value === '' ){
        alert('Campos vacios');
        return false;
    }


    // JSON del mensaje
    var mensaje = {
        nickname: nick.value,
        text: text.value
    };

    //Una vez agregado el nickname, se oculta el input del mismo para no cambiarlo
    nick.style.display = 'none';
    // limpia campo
    text.value = "";

    //se emite el mensaje por socket
    socket.emit('add-mensaje', mensaje);

    //para que no se envie el form
    return false;
}