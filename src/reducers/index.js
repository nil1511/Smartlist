/*
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
    playlist: require('./playlist'),
});
