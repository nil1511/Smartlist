import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
            <Text>Header</Text>
            </View>
        );
    }
}

Header.propTypes = {
    color: React.PropTypes.string
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7758CC',
    },
});

export default Header;