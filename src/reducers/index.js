/*
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');
const initialState = {};

function playlist(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                token: action.token
            });
        default:
            return state
    }
}


module.exports = combineReducers({
    playlist
});
