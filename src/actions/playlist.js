'use strict';

import featherApp from '../featherApp';
import type { Action } from './types';

async function getPlaylist(): Promise<Action> {

    const playlist = await featherApp.service('playlists').find().then((data) => {
        return data;
    });
    return {
        type: 'GET_PLAYLIST',
        playlist,
    };
}

module.exports = { getPlaylist };
