import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Header from '../components/Header';
import Tabs from '../components/Tabs';

var { connect } = require('react-redux');
var { getPlaylist } = require('../actions');

class PlaylistPage extends Component {
    componentDidMount() {
        this.props.getPlaylist();
    }

    render() {
        return (
            <View>
                <Header />
                <Tabs />
                <Text style={styles.instructions}>
                    Press Cmd+R to reload, {'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

function select(store) {
    console.log('store', store);
    return {
        playlist: store.playlist
    };
}

function actions(dispatch) {
    return {
        getPlaylist: () => dispatch(getPlaylist()),
    };
}


module.exports = connect(select, actions)(PlaylistPage);
