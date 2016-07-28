/**
 * @flow
 */


'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
var reducers = require('../reducers');
var promise = require('./promise');
var createLogger = require('redux-logger');
import {persistStore, autoRehydrate} from 'redux-persist';
var {AsyncStorage} = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
});

var createSmartListStore = applyMiddleware(thunk, promise, logger)(createStore);

function configureStore(onComplete: ?() => void) {
    // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
    const store = autoRehydrate()(createSmartListStore)(reducers);
    persistStore(store, { storage: AsyncStorage }, onComplete);
    if (isDebuggingInChrome) {
        window.store = store;
    }
    return store;
}

module.exports = configureStore;
