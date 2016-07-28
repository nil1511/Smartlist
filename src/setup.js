/**
 * @flow
 */

'use strict';

var React = require('React');
var { Provider } = require('react-redux');

var configureStore = require('./store/configureStore');
var App = require('./App');
var featherApp = require('./featherApp');

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
        }

        componentDidMount() {
            this.setState({ performingAuth: true });

            featherApp.io.on('connect', () => {
                this.setState({ connected: true });

                featherApp.authenticate().then(() => {
                    this.setState({ performingAuth: false });
                    // Actions.main();
                    console.log('Logining');
                }).catch(error => {
                    this.setState({ performingAuth: false });
                    // console.log('Error Logining');
                    // Actions.launch();
                    console.log('Error connecting');
                });

            });

            featherApp.io.on('disconnect', () => {
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
