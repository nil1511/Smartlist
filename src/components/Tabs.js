import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const Tab = (props) => {
    if (props.active) {
        return <View style={[styles.activeTab, props.style]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>{props.text}</Text>
        </View>
    }
    return <View style={[props.style]}>
        <Text style={styles.tabText}>{props.text}</Text>
    </View>
}

class Tabs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Tab active={true} style={styles.tab} text='MY PLAYLIST' />
                <Tab style={styles.tab} text='HISTORY' />
            </View>
        );
    }
}

Tabs.propTypes = {
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#7758CC',
        flexDirection: 'row'
    },
    tab: {
        padding: 10
    },
    tabText: {
        color: '#ffffff',
        opacity: 0.6
    },
    tabTextActive: {
        opacity: 1
    },
    activeTab: {
        borderBottomWidth: 2,
        marginBottom: 1,
        borderColor: '#FFFF8C'
    }
});

export default Tabs;