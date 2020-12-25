import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';
import colors from '@app/common/colors';

class Button extends Component {
    render() {

        const {loading, buttonText, enabled, handleSubmit} = this.props;

        if (loading) {
            return (
                <View style={[styles.buttonView]}>
                    <ActivityIndicator color={'white'}/>
                </View>
            );
        }

        return (
            <TouchableWithoutFeedbackEx onPress={() => enabled ? handleSubmit() : null}>
                <View style={[styles.buttonView, !Boolean(enabled) && {opacity: 0.5}]}>
                    <Text style={[styles.buttonText,]}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedbackEx>
        );
    }
}

export default Button;

const styles = StyleSheet.create({
    buttonView: {
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: colors.primary,
        width: '50%', alignSelf:'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight:'800'
    },
});
