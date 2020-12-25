import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, StyleSheet, View, Keyboard} from 'react-native';
import TextBox from '@app/component/TextBox';
import {OS} from '@app/common/constants';
import imgDefault from '@app/assets/icons/profile.png';
import colors from '@app/common/colors';
import Button from '@app/component/Button';
import DropDown from '@app/common/DropDown';
import {EventRegister} from 'react-native-event-listeners';
import {InsertContact} from '@app/services/contact';

import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
    title: 'Choose Profile Image',
    quality: 0.5,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class AddContact extends Component {
    constructor(props) {
        super(props);

        props.navigation.setOptions({
            title: 'Add Contact',
            drawerLabel: 'Add Contact',
        });

        this.state = {
            contact_id: null,
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            category_id: null,
            category_name: '',
            loading: false,
            profile_image: '',
        };
    }

    componentDidMount(): void {

        this.event_add_contact = EventRegister.addEventListener('event_add_contact', data => {
            switch (data.type) {
                case 'edit_contact':
                    this.setState({
                        contact_id: data.item.id,
                        first_name: data.item.first_name,
                        last_name: data.item.last_name,
                        mobile: data.item.mobile,
                        email: data.item.email,
                        category_id: data.item.category_id,
                        category_name: data.item.category_name,
                        profile_image: data.item.profile_image,
                    });
                    break;
                case 'select_category':
                    this.setState({
                        category_id:data.item.id,
                        category_name:data.item.category_name
                    })
                    break;
            }
        });
    }

    validateEmail = (val) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    };
    validatePhone = (val) => {

        let regex = /^(?:[0-9] ?){6,14}[0-9]$/;

        if (regex.test(val)) {
            return true;
        } else {
            return false;
        }

    };

    getProfileImage = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                this.setState({
                    profile_image: response.uri,
                });
            }
        });
    }

    handleSubmit = () => {
        const {first_name, last_name, mobile, email, category_id, contact_id, profile_image} = this.state;

        let valid = true;
        let message = '';

        if (!Boolean(first_name) && !Boolean(first_name.trim())) {
            valid = false;
            message = 'Please enter first name';
        } else if (!Boolean(last_name) && !Boolean(last_name.trim())) {
            valid = false;
            message = 'Please enter last name';
        } else if (!Boolean(mobile) && !Boolean(mobile.trim())) {
            valid = false;
            message = 'Please enter mobile';
        } else if (Boolean(mobile) && Boolean(mobile.trim()) && !this.validatePhone(mobile)) {
            valid = false;
            message = 'Please enter valid mobile';
        } else if (!Boolean(email) && !Boolean(email.trim())) {
            valid = false;
            message = 'Please enter email';
        } else if (Boolean(mobile) && Boolean(mobile.trim()) && !this.validateEmail(email)) {
            valid = false;
            message = 'Please enter valid email';
        } else if (!Boolean(category_id)) {
            valid = false;
            message = 'Please select category';
        }

        if (valid) {
            let reqParams = {
                first_name,
                last_name,
                mobile,
                email,
                category_id,
                profile_image,
            };

            if (contact_id) {
                reqParams.id = contact_id;
            }

            this.setState({
                loading: true,
            });

            InsertContact(reqParams)
                .then(res => {
                    this.setState({
                        contact_id: null,
                        first_name: '',
                        last_name: '',
                        mobile: '',
                        email: '',
                        category_id: null,
                        category_name: '',
                        loading: false,
                        profile_image: '',
                    });

                    Keyboard.dismiss()

                    EventRegister.emit('event_contact_list',{type:"get_contact"})

                    this.props.navigation.navigate('Contact List')

                })
                .catch(error => {
                    this.setState({
                        loading: false,
                    });
                });
        } else {
            alert(message);
        }


    };

    componentWillUnmount(): void {
        EventRegister.removeEventListener(this.event_add_contact);
    }

    render() {
        const {first_name, last_name, mobile, email, loading, category_name, contact_id, profile_image} = this.state;
        return (

            <KeyboardAvoidingView
                behavior={OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={{marginVertical: 20}} showsVerticalScrollIndicator={false}>

                    <TouchableWithoutFeedbackEx onPress={()=> this.getProfileImage()}>
                    <Image source={Boolean(profile_image) ? {uri:profile_image}:imgDefault} style={{
                        height: 100,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: 'white',
                        marginBottom: 50,
                    }}/>
                    </TouchableWithoutFeedbackEx>

                    <TextBox
                        placeholder={'First name'}
                        handleChangeText={(first_name) => this.setState({first_name})}
                        inputContainer={styles.textInputContainer}
                        itemSpace={10}
                        value={first_name}
                    />

                    <TextBox
                        placeholder={'Last name'}
                        handleChangeText={(last_name) => this.setState({last_name})}
                        inputContainer={styles.textInputContainer}
                        itemSpace={10}
                        value={last_name}
                    />

                    <TextBox
                        placeholder={'Mobile'}
                        handleChangeText={(mobile) => this.setState({mobile})}
                        inputContainer={styles.textInputContainer}
                        itemSpace={10}
                        value={mobile}
                        keyboardType={'phone-pad'}
                    />

                    <TextBox
                        placeholder={'Email'}
                        handleChangeText={(email) => this.setState({email})}
                        inputContainer={styles.textInputContainer}
                        itemSpace={10}
                        value={email}
                        keyboardType={'email-address'}
                    />

                    <DropDown
                        title={Boolean(category_name) ? category_name : 'Select Category'}
                        handleClick={() => this.props.navigation.push('CategoryModal', {page: 'add'})}
                    />


                    <Button
                        loading={loading}
                        buttonText={Boolean(contact_id) ? 'Update' : 'Save'}
                        handleSubmit={this.handleSubmit}
                        enabled={true}
                    />

                    <View style={{height: 50}}/>
                </ScrollView>
            </KeyboardAvoidingView>

        );
    }
}

export default AddContact;

const styles = StyleSheet.create({
    container: {
        flex: 1, marginHorizontal: 30,
    },
});
