import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '@app/common/colors';
import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';
import imgDropDown from '@app/assets/icons/down_arrow.png';
import {OS} from '@app/common/constants';

class DropDown extends Component {
    render() {

        const {
            title, inputContainer, inputStyle,
            errorMessage, itemSpace, iconCloseStyle, disabled, handleClick
        } = this.props;

        return (
            <TouchableWithoutFeedbackEx onPress={() => disabled ? null : handleClick()}>
                <View style={{marginVertical: Boolean(itemSpace) ? itemSpace : 10}}>
                    <View style={[styles.container, inputContainer]}>
                        <Text
                            style={[styles.inputText, Boolean(errorMessage) && {borderColor: colors.error}, inputStyle]}
                        >
                            {title}
                        </Text>

                        <View style={[styles.iconCloseContainer, iconCloseStyle]}>
                            <Image source={imgDropDown} style={{height:20, width:20}}/>
                        </View>
                    </View>

                    {Boolean(errorMessage) && <Text style={styles.errorText}>{errorMessage}</Text>}
                </View>
            </TouchableWithoutFeedbackEx>
        );
    }
}

export default DropDown;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.textBoxBorder, marginBottom: 5, borderRadius: 5,
    },
    inputText: {
        flex: 1, paddingRight: 40, fontSize: 15,
        fontWeight: 'normal',
        paddingBottom: OS === 'ios' ? 10 : 0, left: 2,
        marginVertical: 15, marginLeft: 15,
        color:colors.placeholder
    },
    errorText: {
        color: colors.error, fontSize: 13,
    },
    iconCloseContainer: {
        position: 'absolute', right: 0, paddingHorizontal: 10,
        paddingVertical: OS === 'ios' ? 10 : 0,
    },
});
