/**
 * @flow
 */

'use strict';

var React = require('React');
var {AsyncStorage} = require('react-native');
var { Provider } = require('react-redux');

import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';

// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length == 0) {
    window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}

var io = require('socket.io-client/socket.io');

var configureStore = require('./store/configureStore');
var {serverURL} = require('./env');
var App = require('./App');

function setup(): ReactClass<{}> {

    console.disableYellowBox = true;

    class Root extends React.Component {
        state: {
            isLoading: boolean;
            store: any;
        };

        constructor() {
            super();
            this.state = {
                isLoading: true,
                store: configureStore(() => this.setState({ isLoading: false })),
            };

            const options = { transports: ['websocket'], forceNew: true };
            const socket = io(serverURL, options);

            this.app = feathers()
                .configure(socketio(socket))
                .configure(hooks())
                // Use AsyncStorage to store our login toke
                .configure(authentication({
                    storage: AsyncStorage
                }));
        }

        componentDidMount() {
            this.setState({ performingAuth: true });

            this.app.io.on('connect', () => {
                this.setState({ connected: true });

                this.app.authenticate().then(() => {
                    this.setState({ performingAuth: false });
                    // Actions.main();
                    console.log('Logining');
                }).catch(error => {
                    this.setState({ performingAuth: false });
                    // console.log('Error Logining');
                    // Actions.launch();
                });
            });

            this.app.io.on('disconnect', () => {
                this.setState({ connected: false });
                console.log('disconnect');
                // Actions.offline();
            });
        }


        render() {
            if (this.state.isLoading) {
                return null;
            }
            return (
                <Provider store={this.state.store}>
                    <App />
                </Provider>
            );
        }
    }

    return Root;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
