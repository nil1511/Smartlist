import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import PlaylistPage from './containers/PlaylistPage';
var { connect } = require('react-redux');
var { getPlaylist } = require('./actions');

class Smartlist extends Component {

    render() {
        return (
            <PlaylistPage />
        );
    }
}

const styles = StyleSheet.create({
});

function select(store) {
    return {};
}

function actions(dispatch) {
    return {};
}


module.exports = connect(select, actions)(Smartlist);
