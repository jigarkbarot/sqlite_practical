import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '@app/common/colors';
import imgClose from '@app/assets/icons/close.png';
import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';
import {OS} from '@app/common/constants';

class TextBox extends Component {

    render() {

        const {
            value, handleChangeText, inputContainer, inputStyle, multiline,
            errorMessage, itemSpace, iconCloseStyle, disabled,
        } = this.props;

        return (
            <TouchableWithoutFeedbackEx onPress={() => disabled ? null : this.txtBox.focus()}>
                <View style={{marginVertical: Boolean(itemSpace) ? itemSpace : 10}}>
                    <View style={[styles.container, inputContainer]}>
                        <TextInput
                            style={[styles.inputText, Boolean(errorMessage) && {borderColor: colors.error}, inputStyle]}
                            value={value}
                            onChangeText={(text) => handleChangeText(text)}
                            ref={ref => this.txtBox = ref}
                            {...this.props}
                            placeholderTextColor={colors.placeholder}
                        />

                        {
                            Boolean(value) && Boolean(value.trim()) &&
                            <TouchableWithoutFeedbackEx onPress={() => handleChangeText('')}>
                                <View style={[styles.iconCloseContainer, iconCloseStyle]}>
                                    <Image source={imgClose} style={{height: 15, width: 15}}/>
                                </View>
                            </TouchableWithoutFeedbackEx>
                        }
                    </View>

                    {Boolean(errorMessage) && <Text style={styles.errorText}>{errorMessage}</Text>}
                </View>
            </TouchableWithoutFeedbackEx>
        );
    }
}

export default TextBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.textBoxBorder, marginBottom: 5, borderRadius: 5,
    },
    inputText: {
        paddingRight: 40, fontSize: 15, fontWeight: 'normal',
        marginLeft: 15, marginVertical: OS === 'ios' ? 15:0
    },
    errorText: {
        color: colors.error, fontSize: 13,
    },
    iconCloseContainer: {
        position: 'absolute', right: 0, paddingHorizontal: 10,
    },
});
