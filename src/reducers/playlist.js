/**
 * @flow
 */

'use strict';

import type {Action } from '../actions/types';

export type FriendFilter = {
    id: string;
    name: string;
    schedule: { [key: string]: boolean };
};

export type TopicsFilter = {
    [key: string]: boolean;
};

type State = TopicsFilter;

function getPlaylist(state: State = {}, action: Action): State {
    console.log('action', action)
    if (action.type === 'GET_PLAYLIST') {
        return action.playlist;
    }

    return state;
}

module.exports = getPlaylist;
