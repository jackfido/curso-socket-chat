var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error ('Name and Sala are required');
}

var user = {
    name: params.get('name'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', user, function(resp) {
        console.log('User connected', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
/* socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('listaPersona',function(persons){
    console.log(persons);
});

socket.on('mensajePrivado', function(message) {
    console.log('Mensaje privado', message);
});