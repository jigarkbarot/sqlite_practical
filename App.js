/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddCategory from '@app/screen/category/AddCategory';

import {createStackNavigator} from '@react-navigation/stack';
import AddContact from '@app/screen/contact/addContact';
import ContactList from '@app/screen/contact';
import colors from '@app/common/colors';
import {LogBox, StyleSheet} from 'react-native';
import HeaderMenu from '@app/component/HeaderMenu';
import CategoryList from '@app/screen/category/CategoryList';
import {View} from 'react-native';
import {sqlClient} from '@app/common/SQLClient';
import {CreateCategoryTable} from '@app/services/category';
import {CreateContactTable} from '@app/services/contact';

const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator();

export const navOptions = ({navigation}) => {
    return {
        headerStyle: {
            backgroundColor: colors.primary,
            borderBottomWidth: 0,
            shadowOpacity: 0
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            textAlign: 'center',
            alignSelf: 'center',
        },
        headerBackTitleVisible: false,
        cardStyle: {
            backgroundColor: 'white'
        },
        headerLeft: () => <HeaderMenu navigation={navigation} />,
        headerRight:()=> <View/>,
        headerShown:true
    }
}


const DrawerNavigator=()=>{
    return(
        <Drawer.Navigator initialRouteName="Add Category"
                          drawerStyle={{
                              backgroundColor: colors.background,
                          }}
                          drawerContentOptions={{
                              activeTintColor: colors.primary,
                              itemStyle: {marginVertical:0,marginBottom:0,borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.primary },
                              labelStyle:{ marginVertical: 20},
                              activeBackgroundColor:'transparent',
                              inactiveTintColor:'white'
                          }}

        >
            <Drawer.Screen name="Add Category" component={AddCategory} options={navOptions} />
            <Drawer.Screen name="Add Contact" component={AddContact} options={navOptions} />
            <Drawer.Screen name="Contact List" component={ContactList} options={navOptions} />
        </Drawer.Navigator>
    )
}


const App = () => {

    LogBox.ignoreAllLogs()

    CreateCategoryTable();
    CreateContactTable();

    return (
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="MainNavigation"
                mode="modal"
            >
                <AppStack.Screen name={'MainNavigation'} component={DrawerNavigator} options={{headerShown:false}} />
                <AppStack.Screen name={'CategoryModal'} component={CategoryList} options={{title:'Select Category', headerBackTitleVisible:false}} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default App;
