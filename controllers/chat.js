const Chat = require('../models/Chat');

module.exports.connection = function (socket) {
    console.log('User connected', socket.request.user._id);

    socket.on('connect_error', connectError);
    socket.on('disconnect', disconnect);
    socket.on('firstLoad', async () => {
        try {
            const messages = await Chat.find();

            socket.emit('message', messages);
        }
        catch (e) {
            connectError(e);
        }
    });

    socket.on('message', async (data) => {
        try {
            const message = {
                name: socket.request.user.name,
                message: data,
                user: socket.request.user._id
            };

            await new Chat(message).save();
            socket.broadcast.emit('message', message);
        }
        catch (e) {
            connectError(e);
        }
    });
};

function connectError(err) {
    console.log(`connect_error due to ${err.message}`);
}

function disconnect(reason) {
    console.log(`User disconnected`, reason);
}
