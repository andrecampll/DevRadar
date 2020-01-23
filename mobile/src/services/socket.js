import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.106:3333', {
    autoConnect : false,
});

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latidude, longitude, techs) {
    socket.io.opts.query = {
        latidude,
        longitude,
        techs,
    };
    
    socket.connect();
}

function disconnect() {
    if (socket.disconnect) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect, 
    subscribeToNewDevs,
};