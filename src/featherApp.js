import {AsyncStorage} from 'react-native';
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
import {serverURL} from './env';

// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length == 0) {
    window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}

var io = require('socket.io-client/socket.io');

const options = { transports: ['websocket'], forceNew: true };
const socket = io(serverURL, options);

const app = feathers()
    .configure(socketio(socket))
    .configure(hooks())
    // Use AsyncStorage to store our login toke
    .configure(authentication({
        storage: AsyncStorage
    }));

module.exports = app;