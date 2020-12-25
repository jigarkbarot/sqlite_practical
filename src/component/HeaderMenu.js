import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import imgMenu from '@app/assets/icons/menu.png';

const HeaderMenu = (props) => {
    const {navigation} = props
    return (
        <TouchableWithoutFeedback onPress={()=> navigation.openDrawer()}>
            <View style={{marginHorizontal: 15}}>
                <Image source={imgMenu} style={{height: 25, width: 25}}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HeaderMenu;
