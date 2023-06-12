const { io } = require('../server');
const {Users} = require('../classes/users')
const users = new Users();
const {createMessage} = require('../utils/utils');

io.on('connection', (client) => {
    // console.log('Usuario conectado');
    client.on('entrarChat', (user, callback)=>{
        // console.log(user);

        if (!user.name || !user.sala) {
            return callback({
                error: true,
                message: 'Name and Sala are required'
            });
        }

        client.join(user.sala);

        let persons = users.addPerson(client.id, user.name, user.sala);

        client.broadcast.to(user.sala).emit('listaPersona', users.getPersonsByRoom(user.sala));

        callback(users.getPersonsByRoom(user.sala));
    });

    client.on('crearMensaje', (data)=>{
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);

        client.broadcast.to(person.sala).emit('crearMensaje', message);
    });

    client.on('disconnect', ()=> {
        let personRemoved = users.removePerson(client.id);

        client.broadcast.to(personRemoved.sala).emit('crearMensaje',createMessage('Administrator', `${personRemoved.name} left chat`));
        client.broadcast.to(personRemoved.sala).emit('listaPersona', users.getPersonsByRoom(personRemoved.sala));
    });

    client.on('mensajePrivado', (data) => {
        let person = users.getPerson(client.id);

        client.broadcast.to(data.to).emit('mensajePrivado', createMessage(person.name, data.message));
    });
});