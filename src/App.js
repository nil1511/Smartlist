import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
var { connect } = require('react-redux');
var { getPlaylist } = require('./actions');

class Smartlist extends Component {
    componentDidMount() {
        this.props.getPlaylist();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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


module.exports = connect(select, actions)(Smartlist);
